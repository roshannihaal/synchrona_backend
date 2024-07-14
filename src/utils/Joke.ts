import { JokeResponseDTO } from './utils.dto'
import { config, JokeBlackListEnum } from '../config'
import { jokeAxios } from './Axios'
import { socketClientService } from '../service'
import { io } from '../app'
import { eventEmitter } from '../constants'

export let joke: string

export const fetchJoke = async () => {
  try {
    if (!config.JOKE_WHITELIST?.length) {
      throw new Error('JOKE_WHITELIST is required')
    }
    const blacklistFlags = config.JOKE_BLACKLIST?.join()
    const whitelistFlags = config.JOKE_WHITELIST.join()

    let url = `/joke/${whitelistFlags}`

    if (config.JOKE_SAFE) {
      url += '?safe-mode'
    }

    const response = await jokeAxios.get(url, {
      params: {
        blacklistFlags,
      },
    })
    const { data } = response
    if (data.error) {
      throw new Error(data.message)
    }

    const parsedData = JokeResponseDTO.parse(data)
    setJoke(parsedData)
  } catch (error) {
    console.error('🚀 ~ fetchJoke ~ error:', error)
  }
}

const setJoke = (jokeData: JokeResponseDTO) => {
  // Safety check
  const validJoke = isExpectedJoke(jokeData)

  //   Set Joke
  if (validJoke) {
    if (jokeData.type === 'twopart') {
      joke = `${jokeData.setup}\n\n${jokeData.delivery}`
    } else if (jokeData.joke) {
      joke = jokeData.joke
    }
    socketClientService.emitJoke(joke)
  }
}

const isExpectedJoke = (jokeData: JokeResponseDTO): boolean => {
  if (config.JOKE_SAFE && !jokeData.safe) {
    return false
  }
  if (config.JOKE_BLACKLIST?.length) {
    for (let blacklistFlags of config.JOKE_BLACKLIST) {
      const key = JokeBlackListEnum.options.find(
        (enumVal) => enumVal === blacklistFlags,
      )
      if (key && jokeData.flags[key]) {
        return false
      }
    }
  }
  return true
}
