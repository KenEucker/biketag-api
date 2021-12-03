export const getTagNumbersFromTextRegex = new RegExp(
  /((?:(?:bike\s*)?(?:\s*tag)?)(#|num|number)(\d+)(?:(?:\s*tag)?|(?:\s*proof)?))|((?:bike\s*)?(?:tag\s*)(#|num|number)?\s*(\d+))|((?:(?:found\s*#?)|(?:here'?i?s?\s*))\[?(\d+)\]?)/gi
)

export const getCreditFromTextRegex = new RegExp(
  /((?:proof\s*(?:found\s*at\s*)?(?:\(.*\))?\s*by\s*)(.*?(?=]|$)))|((?:tag\s*(?:\((?:hint:)?.*\))?\s*by\s*)(.+?(?=]|\r|\n|$))?)|((?:tag\s*(?:\((?:hint:)?.*\))?\s*by\s*)(.+?(?=]|\r|\n))?)|((?:credit goes to:\s*)(.*)(?:\sfor finding))|(?:tag\s*)(?:number\s*)?(\d*)?(?:\s*by\s*)(.+?(?=$|\n))/i
)

export const getFoundLocationFromTextRegex = new RegExp(
  /(?:is\s*(at|the)?\s*\(?)(.+?)(?:\)|]|$)|(?:found\s*(at)?\s*\(?)(.+?)(?:\)|])|(?:found\s*at\s*\()(.+?)(?:\))|(?:\[(?:\s*bike\s*)(?:\s*tag\s*))#?(\d+)(?:(?:\])|(?:\s*.\s*(.*)\]))/gim
)

export const getPlayerFromInfoFromTextRegex = new RegExp(
  /(?:\[Player\s*)(.*)(?:]\s*\+\()(.*)(?=\))/i
)

export const getGameFromInfoFromTextRegex = new RegExp(
  /(((?:\[BikeTag\s*Game\s*)(.*)(?:]))((?:\s*#\()(.*)(?=\))\))?((?:\s*\|)(.*)(?=\|)\|)?)|(((?:{\s*)(.*)(?:}))((?:\s*\[)(.*)(?=\])\])?((?:\s*@\()(.*)(?=\))\))?)/i
)

export const getHintFromTextRegex = new RegExp(/(?:hint:\s*?)([^)]*)/i)

export const getGPSLocationFromTextRegex = new RegExp(
  /(([0-9]{1,2})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([N|S]),?\s*([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([E|W]))|((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?))/
)

export const getImageURLsFromTextRegex = new RegExp(
  /https?:\/\/.*?\.[a-z]{2,4}\/.+?(?=\)|\s|$)/gi
)

export const getAlbumIdFromTextRegex = new RegExp(
  /((?:imgur.com\/)(?:(a|album|gallery)\/)(\w+))/i
)

export const getDiscussionUrlFromTextRegex = RegExp(/{(.*)}/i)
export const getGPSCoordinatesValueFromTextRegex = RegExp(/\((.*)\)/i)
export const getTagnumberFromSlugRegex = RegExp(/([^-]*)([^-]*)(\d)/)
export const getImgurImageHashFromUrlRegex = RegExp(
  /(?:imgur.com\/)(.*)(?:\.)/i
)
export const getSanityImageUrlHashFromTextRegex = RegExp(
  /^(?:image-)(.*?(?=-(-png|-jpg|-jpeg|-gif)))/i
)

export const getCreditFromTwitterTextRegex = RegExp(
  /(?:tag\s*)(?:number\s*)?(\d*)?(?:\s*by\s*)(.+?(?=$|\n))/i
)
