export const getTagNumbersFromTextRegex = new RegExp(
  /((?:(?:bike\s*)?(?:\s*tag)?)#(\d+)(?:(?:\s*tag)?|(?:\s*proof)?))|(?:\[(?:\s*bike\s*)(?:\s*tag\s*))#?(\d+)(?:(?:\])|(?:\s*.\s*.*\]))/gi
)

export const getCreditFromTextRegex = new RegExp(
  /((?:\[.*)?(?:proof\s*(?:found\s*at\s*)?(?:\(.*\))?\s*by\s*)(.*)(?:\])?)|((?:\[.*)?(?:tag\s*(?:\((?:hint:)?.*\))?\s*by\s*)(.*)(?:\])?)|((?:credit goes to:\s*)(.*)(?:\s*for))/gi
)

export const getFoundLocationFromTextRegex = new RegExp(
  /(?:found at \()(.+?)(?:\))|(?:\[(?:\s*bike\s*)(?:\s*tag\s*))#?(\d+)(?:(?:\])|(?:\s*.\s*(.*)\]))/gi
)

export const getHintFromTextRegex = new RegExp(/(?:hint:\s*?)([^)]*)/gi)

export const getGPSLocationFromTextRegex = new RegExp(
  /(([0-9]{1,2})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([N|S]),?\s*([0-9]{1,3})[:|°]([0-9]{1,2})[:|'|′]?([0-9]{1,2}(?:\.[0-9]+){0,1})?["|″]([E|W]))|((-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?))/g
)

export const getImageURLsFromTextRegex = new RegExp(
  /\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s)]*\b)/gi
)

export const getDiscussionUrlFromTextRegex = RegExp(/{(.*)}/gi)
export const getGPSCoordinatesValueFromTextRegex = RegExp(/\((.*)\)/gi)
export const getTagnumberFromSlugRegex = RegExp(/([^-]*)([^-]*)(\d)/g)
export const getImgurImageHashFromUrlRegex = RegExp(
  /(?:imgur.com\/)(.*)(?:\.)/gi
)
