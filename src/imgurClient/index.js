;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if (typeof define === 'function' && define.amd)
    define('imgur', [], factory)
  else if (typeof exports === 'object') exports['imgur'] = factory()
  else root['imgur'] = factory()
})(this, function () {
  return /******/ (() => {
    // webpackBootstrap
    /******/ var __webpack_modules__ = {
      /***/ './node_modules/axios/index.js':
        /*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          module.exports = __webpack_require__(
            /*! ./lib/axios */ './node_modules/axios/lib/axios.js'
          )

          /***/
        },

      /***/ './node_modules/axios/lib/adapters/xhr.js':
        /*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )
          var settle = __webpack_require__(
            /*! ./../core/settle */ './node_modules/axios/lib/core/settle.js'
          )
          var cookies = __webpack_require__(
            /*! ./../helpers/cookies */ './node_modules/axios/lib/helpers/cookies.js'
          )
          var buildURL = __webpack_require__(
            /*! ./../helpers/buildURL */ './node_modules/axios/lib/helpers/buildURL.js'
          )
          var buildFullPath = __webpack_require__(
            /*! ../core/buildFullPath */ './node_modules/axios/lib/core/buildFullPath.js'
          )
          var parseHeaders = __webpack_require__(
            /*! ./../helpers/parseHeaders */ './node_modules/axios/lib/helpers/parseHeaders.js'
          )
          var isURLSameOrigin = __webpack_require__(
            /*! ./../helpers/isURLSameOrigin */ './node_modules/axios/lib/helpers/isURLSameOrigin.js'
          )
          var createError = __webpack_require__(
            /*! ../core/createError */ './node_modules/axios/lib/core/createError.js'
          )

          module.exports = function xhrAdapter(config) {
            return new Promise(function dispatchXhrRequest(resolve, reject) {
              var requestData = config.data
              var requestHeaders = config.headers

              if (utils.isFormData(requestData)) {
                delete requestHeaders['Content-Type'] // Let the browser set it
              }

              var request = new XMLHttpRequest()

              // HTTP basic authentication
              if (config.auth) {
                var username = config.auth.username || ''
                var password = config.auth.password
                  ? unescape(encodeURIComponent(config.auth.password))
                  : ''
                requestHeaders.Authorization =
                  'Basic ' + btoa(username + ':' + password)
              }

              var fullPath = buildFullPath(config.baseURL, config.url)
              request.open(
                config.method.toUpperCase(),
                buildURL(fullPath, config.params, config.paramsSerializer),
                true
              )

              // Set the request timeout in MS
              request.timeout = config.timeout

              // Listen for ready state
              request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                  return
                }

                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (
                  request.status === 0 &&
                  !(
                    request.responseURL &&
                    request.responseURL.indexOf('file:') === 0
                  )
                ) {
                  return
                }

                // Prepare the response
                var responseHeaders =
                  'getAllResponseHeaders' in request
                    ? parseHeaders(request.getAllResponseHeaders())
                    : null
                var responseData =
                  !config.responseType || config.responseType === 'text'
                    ? request.responseText
                    : request.response
                var response = {
                  data: responseData,
                  status: request.status,
                  statusText: request.statusText,
                  headers: responseHeaders,
                  config: config,
                  request: request,
                }

                settle(resolve, reject, response)

                // Clean up request
                request = null
              }

              // Handle browser request cancellation (as opposed to a manual cancellation)
              request.onabort = function handleAbort() {
                if (!request) {
                  return
                }

                reject(
                  createError(
                    'Request aborted',
                    config,
                    'ECONNABORTED',
                    request
                  )
                )

                // Clean up request
                request = null
              }

              // Handle low level network errors
              request.onerror = function handleError() {
                // Real errors are hidden from us by the browser
                // onerror should only fire if it's a network error
                reject(createError('Network Error', config, null, request))

                // Clean up request
                request = null
              }

              // Handle timeout
              request.ontimeout = function handleTimeout() {
                var timeoutErrorMessage =
                  'timeout of ' + config.timeout + 'ms exceeded'
                if (config.timeoutErrorMessage) {
                  timeoutErrorMessage = config.timeoutErrorMessage
                }
                reject(
                  createError(
                    timeoutErrorMessage,
                    config,
                    'ECONNABORTED',
                    request
                  )
                )

                // Clean up request
                request = null
              }

              // Add xsrf header
              // This is only done if running in a standard browser environment.
              // Specifically not if we're in a web worker, or react-native.
              if (utils.isStandardBrowserEnv()) {
                // Add xsrf header
                var xsrfValue =
                  (config.withCredentials || isURLSameOrigin(fullPath)) &&
                  config.xsrfCookieName
                    ? cookies.read(config.xsrfCookieName)
                    : undefined

                if (xsrfValue) {
                  requestHeaders[config.xsrfHeaderName] = xsrfValue
                }
              }

              // Add headers to the request
              if ('setRequestHeader' in request) {
                utils.forEach(
                  requestHeaders,
                  function setRequestHeader(val, key) {
                    if (
                      typeof requestData === 'undefined' &&
                      key.toLowerCase() === 'content-type'
                    ) {
                      // Remove Content-Type if data is undefined
                      delete requestHeaders[key]
                    } else {
                      // Otherwise add header to the request
                      request.setRequestHeader(key, val)
                    }
                  }
                )
              }

              // Add withCredentials to request if needed
              if (!utils.isUndefined(config.withCredentials)) {
                request.withCredentials = !!config.withCredentials
              }

              // Add responseType to request if needed
              if (config.responseType) {
                try {
                  request.responseType = config.responseType
                } catch (e) {
                  // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                  // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                  if (config.responseType !== 'json') {
                    throw e
                  }
                }
              }

              // Handle progress if needed
              if (typeof config.onDownloadProgress === 'function') {
                request.addEventListener('progress', config.onDownloadProgress)
              }

              // Not all browsers support upload events
              if (
                typeof config.onUploadProgress === 'function' &&
                request.upload
              ) {
                request.upload.addEventListener(
                  'progress',
                  config.onUploadProgress
                )
              }

              if (config.cancelToken) {
                // Handle cancellation
                config.cancelToken.promise.then(function onCanceled(cancel) {
                  if (!request) {
                    return
                  }

                  request.abort()
                  reject(cancel)
                  // Clean up request
                  request = null
                })
              }

              if (!requestData) {
                requestData = null
              }

              // Send the request
              request.send(requestData)
            })
          }

          /***/
        },

      /***/ './node_modules/axios/lib/axios.js':
        /*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/axios/lib/utils.js'
          )
          var bind = __webpack_require__(
            /*! ./helpers/bind */ './node_modules/axios/lib/helpers/bind.js'
          )
          var Axios = __webpack_require__(
            /*! ./core/Axios */ './node_modules/axios/lib/core/Axios.js'
          )
          var mergeConfig = __webpack_require__(
            /*! ./core/mergeConfig */ './node_modules/axios/lib/core/mergeConfig.js'
          )
          var defaults = __webpack_require__(
            /*! ./defaults */ './node_modules/axios/lib/defaults.js'
          )

          /**
           * Create an instance of Axios
           *
           * @param {Object} defaultConfig The default config for the instance
           * @return {Axios} A new instance of Axios
           */
          function createInstance(defaultConfig) {
            var context = new Axios(defaultConfig)
            var instance = bind(Axios.prototype.request, context)

            // Copy axios.prototype to instance
            utils.extend(instance, Axios.prototype, context)

            // Copy context to instance
            utils.extend(instance, context)

            return instance
          }

          // Create the default instance to be exported
          var axios = createInstance(defaults)

          // Expose Axios class to allow class inheritance
          axios.Axios = Axios

          // Factory for creating new instances
          axios.create = function create(instanceConfig) {
            return createInstance(mergeConfig(axios.defaults, instanceConfig))
          }

          // Expose Cancel & CancelToken
          axios.Cancel = __webpack_require__(
            /*! ./cancel/Cancel */ './node_modules/axios/lib/cancel/Cancel.js'
          )
          axios.CancelToken = __webpack_require__(
            /*! ./cancel/CancelToken */ './node_modules/axios/lib/cancel/CancelToken.js'
          )
          axios.isCancel = __webpack_require__(
            /*! ./cancel/isCancel */ './node_modules/axios/lib/cancel/isCancel.js'
          )

          // Expose all/spread
          axios.all = function all(promises) {
            return Promise.all(promises)
          }
          axios.spread = __webpack_require__(
            /*! ./helpers/spread */ './node_modules/axios/lib/helpers/spread.js'
          )

          // Expose isAxiosError
          axios.isAxiosError = __webpack_require__(
            /*! ./helpers/isAxiosError */ './node_modules/axios/lib/helpers/isAxiosError.js'
          )

          module.exports = axios

          // Allow use of default import syntax in TypeScript
          module.exports.default = axios

          /***/
        },

      /***/ './node_modules/axios/lib/cancel/Cancel.js':
        /*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * A `Cancel` is an object that is thrown when an operation is canceled.
           *
           * @class
           * @param {string=} message The message.
           */
          function Cancel(message) {
            this.message = message
          }

          Cancel.prototype.toString = function toString() {
            return 'Cancel' + (this.message ? ': ' + this.message : '')
          }

          Cancel.prototype.__CANCEL__ = true

          module.exports = Cancel

          /***/
        },

      /***/ './node_modules/axios/lib/cancel/CancelToken.js':
        /*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var Cancel = __webpack_require__(
            /*! ./Cancel */ './node_modules/axios/lib/cancel/Cancel.js'
          )

          /**
           * A `CancelToken` is an object that can be used to request cancellation of an operation.
           *
           * @class
           * @param {Function} executor The executor function.
           */
          function CancelToken(executor) {
            if (typeof executor !== 'function') {
              throw new TypeError('executor must be a function.')
            }

            var resolvePromise
            this.promise = new Promise(function promiseExecutor(resolve) {
              resolvePromise = resolve
            })

            var token = this
            executor(function cancel(message) {
              if (token.reason) {
                // Cancellation has already been requested
                return
              }

              token.reason = new Cancel(message)
              resolvePromise(token.reason)
            })
          }

          /**
           * Throws a `Cancel` if cancellation has been requested.
           */
          CancelToken.prototype.throwIfRequested = function throwIfRequested() {
            if (this.reason) {
              throw this.reason
            }
          }

          /**
           * Returns an object that contains a new `CancelToken` and a function that, when called,
           * cancels the `CancelToken`.
           */
          CancelToken.source = function source() {
            var cancel
            var token = new CancelToken(function executor(c) {
              cancel = c
            })
            return {
              token: token,
              cancel: cancel,
            }
          }

          module.exports = CancelToken

          /***/
        },

      /***/ './node_modules/axios/lib/cancel/isCancel.js':
        /*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
        /***/ (module) => {
          'use strict'

          module.exports = function isCancel(value) {
            return !!(value && value.__CANCEL__)
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/Axios.js':
        /*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )
          var buildURL = __webpack_require__(
            /*! ../helpers/buildURL */ './node_modules/axios/lib/helpers/buildURL.js'
          )
          var InterceptorManager = __webpack_require__(
            /*! ./InterceptorManager */ './node_modules/axios/lib/core/InterceptorManager.js'
          )
          var dispatchRequest = __webpack_require__(
            /*! ./dispatchRequest */ './node_modules/axios/lib/core/dispatchRequest.js'
          )
          var mergeConfig = __webpack_require__(
            /*! ./mergeConfig */ './node_modules/axios/lib/core/mergeConfig.js'
          )

          /**
           * Create a new instance of Axios
           *
           * @param {Object} instanceConfig The default config for the instance
           */
          function Axios(instanceConfig) {
            this.defaults = instanceConfig
            this.interceptors = {
              request: new InterceptorManager(),
              response: new InterceptorManager(),
            }
          }

          /**
           * Dispatch a request
           *
           * @param {Object} config The config specific for this request (merged with this.defaults)
           */
          Axios.prototype.request = function request(config) {
            /*eslint no-param-reassign:0*/
            // Allow for axios('example/url'[, config]) a la fetch API
            if (typeof config === 'string') {
              config = arguments[1] || {}
              config.url = arguments[0]
            } else {
              config = config || {}
            }

            config = mergeConfig(this.defaults, config)

            // Set config.method
            if (config.method) {
              config.method = config.method.toLowerCase()
            } else if (this.defaults.method) {
              config.method = this.defaults.method.toLowerCase()
            } else {
              config.method = 'get'
            }

            // Hook up interceptors middleware
            var chain = [dispatchRequest, undefined]
            var promise = Promise.resolve(config)

            this.interceptors.request.forEach(
              function unshiftRequestInterceptors(interceptor) {
                chain.unshift(interceptor.fulfilled, interceptor.rejected)
              }
            )

            this.interceptors.response.forEach(
              function pushResponseInterceptors(interceptor) {
                chain.push(interceptor.fulfilled, interceptor.rejected)
              }
            )

            while (chain.length) {
              promise = promise.then(chain.shift(), chain.shift())
            }

            return promise
          }

          Axios.prototype.getUri = function getUri(config) {
            config = mergeConfig(this.defaults, config)
            return buildURL(
              config.url,
              config.params,
              config.paramsSerializer
            ).replace(/^\?/, '')
          }

          // Provide aliases for supported request methods
          utils.forEach(
            ['delete', 'get', 'head', 'options'],
            function forEachMethodNoData(method) {
              /*eslint func-names:0*/
              Axios.prototype[method] = function (url, config) {
                return this.request(
                  mergeConfig(config || {}, {
                    method: method,
                    url: url,
                    data: (config || {}).data,
                  })
                )
              }
            }
          )

          utils.forEach(
            ['post', 'put', 'patch'],
            function forEachMethodWithData(method) {
              /*eslint func-names:0*/
              Axios.prototype[method] = function (url, data, config) {
                return this.request(
                  mergeConfig(config || {}, {
                    method: method,
                    url: url,
                    data: data,
                  })
                )
              }
            }
          )

          module.exports = Axios

          /***/
        },

      /***/ './node_modules/axios/lib/core/InterceptorManager.js':
        /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          function InterceptorManager() {
            this.handlers = []
          }

          /**
           * Add a new interceptor to the stack
           *
           * @param {Function} fulfilled The function to handle `then` for a `Promise`
           * @param {Function} rejected The function to handle `reject` for a `Promise`
           *
           * @return {Number} An ID used to remove interceptor later
           */
          InterceptorManager.prototype.use = function use(fulfilled, rejected) {
            this.handlers.push({
              fulfilled: fulfilled,
              rejected: rejected,
            })
            return this.handlers.length - 1
          }

          /**
           * Remove an interceptor from the stack
           *
           * @param {Number} id The ID that was returned by `use`
           */
          InterceptorManager.prototype.eject = function eject(id) {
            if (this.handlers[id]) {
              this.handlers[id] = null
            }
          }

          /**
           * Iterate over all the registered interceptors
           *
           * This method is particularly useful for skipping over any
           * interceptors that may have become `null` calling `eject`.
           *
           * @param {Function} fn The function to call for each interceptor
           */
          InterceptorManager.prototype.forEach = function forEach(fn) {
            utils.forEach(this.handlers, function forEachHandler(h) {
              if (h !== null) {
                fn(h)
              }
            })
          }

          module.exports = InterceptorManager

          /***/
        },

      /***/ './node_modules/axios/lib/core/buildFullPath.js':
        /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var isAbsoluteURL = __webpack_require__(
            /*! ../helpers/isAbsoluteURL */ './node_modules/axios/lib/helpers/isAbsoluteURL.js'
          )
          var combineURLs = __webpack_require__(
            /*! ../helpers/combineURLs */ './node_modules/axios/lib/helpers/combineURLs.js'
          )

          /**
           * Creates a new URL by combining the baseURL with the requestedURL,
           * only when the requestedURL is not already an absolute URL.
           * If the requestURL is absolute, this function returns the requestedURL untouched.
           *
           * @param {string} baseURL The base URL
           * @param {string} requestedURL Absolute or relative URL to combine
           * @returns {string} The combined full path
           */
          module.exports = function buildFullPath(baseURL, requestedURL) {
            if (baseURL && !isAbsoluteURL(requestedURL)) {
              return combineURLs(baseURL, requestedURL)
            }
            return requestedURL
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/createError.js':
        /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var enhanceError = __webpack_require__(
            /*! ./enhanceError */ './node_modules/axios/lib/core/enhanceError.js'
          )

          /**
           * Create an Error with the specified message, config, error code, request and response.
           *
           * @param {string} message The error message.
           * @param {Object} config The config.
           * @param {string} [code] The error code (for example, 'ECONNABORTED').
           * @param {Object} [request] The request.
           * @param {Object} [response] The response.
           * @returns {Error} The created error.
           */
          module.exports = function createError(
            message,
            config,
            code,
            request,
            response
          ) {
            var error = new Error(message)
            return enhanceError(error, config, code, request, response)
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/dispatchRequest.js':
        /*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )
          var transformData = __webpack_require__(
            /*! ./transformData */ './node_modules/axios/lib/core/transformData.js'
          )
          var isCancel = __webpack_require__(
            /*! ../cancel/isCancel */ './node_modules/axios/lib/cancel/isCancel.js'
          )
          var defaults = __webpack_require__(
            /*! ../defaults */ './node_modules/axios/lib/defaults.js'
          )

          /**
           * Throws a `Cancel` if cancellation has been requested.
           */
          function throwIfCancellationRequested(config) {
            if (config.cancelToken) {
              config.cancelToken.throwIfRequested()
            }
          }

          /**
           * Dispatch a request to the server using the configured adapter.
           *
           * @param {object} config The config that is to be used for the request
           * @returns {Promise} The Promise to be fulfilled
           */
          module.exports = function dispatchRequest(config) {
            throwIfCancellationRequested(config)

            // Ensure headers exist
            config.headers = config.headers || {}

            // Transform request data
            config.data = transformData(
              config.data,
              config.headers,
              config.transformRequest
            )

            // Flatten headers
            config.headers = utils.merge(
              config.headers.common || {},
              config.headers[config.method] || {},
              config.headers
            )

            utils.forEach(
              ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
              function cleanHeaderConfig(method) {
                delete config.headers[method]
              }
            )

            var adapter = config.adapter || defaults.adapter

            return adapter(config).then(
              function onAdapterResolution(response) {
                throwIfCancellationRequested(config)

                // Transform response data
                response.data = transformData(
                  response.data,
                  response.headers,
                  config.transformResponse
                )

                return response
              },
              function onAdapterRejection(reason) {
                if (!isCancel(reason)) {
                  throwIfCancellationRequested(config)

                  // Transform response data
                  if (reason && reason.response) {
                    reason.response.data = transformData(
                      reason.response.data,
                      reason.response.headers,
                      config.transformResponse
                    )
                  }
                }

                return Promise.reject(reason)
              }
            )
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/enhanceError.js':
        /*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Update an Error with the specified config, error code, and response.
           *
           * @param {Error} error The error to update.
           * @param {Object} config The config.
           * @param {string} [code] The error code (for example, 'ECONNABORTED').
           * @param {Object} [request] The request.
           * @param {Object} [response] The response.
           * @returns {Error} The error.
           */
          module.exports = function enhanceError(
            error,
            config,
            code,
            request,
            response
          ) {
            error.config = config
            if (code) {
              error.code = code
            }

            error.request = request
            error.response = response
            error.isAxiosError = true

            error.toJSON = function toJSON() {
              return {
                // Standard
                message: this.message,
                name: this.name,
                // Microsoft
                description: this.description,
                number: this.number,
                // Mozilla
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                // Axios
                config: this.config,
                code: this.code,
              }
            }
            return error
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/mergeConfig.js':
        /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ../utils */ './node_modules/axios/lib/utils.js'
          )

          /**
           * Config-specific merge-function which creates a new config-object
           * by merging two configuration objects together.
           *
           * @param {Object} config1
           * @param {Object} config2
           * @returns {Object} New object resulting from merging config2 to config1
           */
          module.exports = function mergeConfig(config1, config2) {
            // eslint-disable-next-line no-param-reassign
            config2 = config2 || {}
            var config = {}

            var valueFromConfig2Keys = ['url', 'method', 'data']
            var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params']
            var defaultToConfig2Keys = [
              'baseURL',
              'transformRequest',
              'transformResponse',
              'paramsSerializer',
              'timeout',
              'timeoutMessage',
              'withCredentials',
              'adapter',
              'responseType',
              'xsrfCookieName',
              'xsrfHeaderName',
              'onUploadProgress',
              'onDownloadProgress',
              'decompress',
              'maxContentLength',
              'maxBodyLength',
              'maxRedirects',
              'transport',
              'httpAgent',
              'httpsAgent',
              'cancelToken',
              'socketPath',
              'responseEncoding',
            ]
            var directMergeKeys = ['validateStatus']

            function getMergedValue(target, source) {
              if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
                return utils.merge(target, source)
              } else if (utils.isPlainObject(source)) {
                return utils.merge({}, source)
              } else if (utils.isArray(source)) {
                return source.slice()
              }
              return source
            }

            function mergeDeepProperties(prop) {
              if (!utils.isUndefined(config2[prop])) {
                config[prop] = getMergedValue(config1[prop], config2[prop])
              } else if (!utils.isUndefined(config1[prop])) {
                config[prop] = getMergedValue(undefined, config1[prop])
              }
            }

            utils.forEach(
              valueFromConfig2Keys,
              function valueFromConfig2(prop) {
                if (!utils.isUndefined(config2[prop])) {
                  config[prop] = getMergedValue(undefined, config2[prop])
                }
              }
            )

            utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties)

            utils.forEach(
              defaultToConfig2Keys,
              function defaultToConfig2(prop) {
                if (!utils.isUndefined(config2[prop])) {
                  config[prop] = getMergedValue(undefined, config2[prop])
                } else if (!utils.isUndefined(config1[prop])) {
                  config[prop] = getMergedValue(undefined, config1[prop])
                }
              }
            )

            utils.forEach(directMergeKeys, function merge(prop) {
              if (prop in config2) {
                config[prop] = getMergedValue(config1[prop], config2[prop])
              } else if (prop in config1) {
                config[prop] = getMergedValue(undefined, config1[prop])
              }
            })

            var axiosKeys = valueFromConfig2Keys
              .concat(mergeDeepPropertiesKeys)
              .concat(defaultToConfig2Keys)
              .concat(directMergeKeys)

            var otherKeys = Object.keys(config1)
              .concat(Object.keys(config2))
              .filter(function filterAxiosKeys(key) {
                return axiosKeys.indexOf(key) === -1
              })

            utils.forEach(otherKeys, mergeDeepProperties)

            return config
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/settle.js':
        /*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var createError = __webpack_require__(
            /*! ./createError */ './node_modules/axios/lib/core/createError.js'
          )

          /**
           * Resolve or reject a Promise based on response status.
           *
           * @param {Function} resolve A function that resolves the promise.
           * @param {Function} reject A function that rejects the promise.
           * @param {object} response The response.
           */
          module.exports = function settle(resolve, reject, response) {
            var validateStatus = response.config.validateStatus
            if (
              !response.status ||
              !validateStatus ||
              validateStatus(response.status)
            ) {
              resolve(response)
            } else {
              reject(
                createError(
                  'Request failed with status code ' + response.status,
                  response.config,
                  null,
                  response.request,
                  response
                )
              )
            }
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/transformData.js':
        /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          /**
           * Transform the data for a request or a response
           *
           * @param {Object|String} data The data to be transformed
           * @param {Array} headers The headers for the request or response
           * @param {Array|Function} fns A single function or Array of functions
           * @returns {*} The resulting transformed data
           */
          module.exports = function transformData(data, headers, fns) {
            /*eslint no-param-reassign:0*/
            utils.forEach(fns, function transform(fn) {
              data = fn(data, headers)
            })

            return data
          }

          /***/
        },

      /***/ './node_modules/axios/lib/defaults.js':
        /*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/axios/lib/utils.js'
          )
          var normalizeHeaderName = __webpack_require__(
            /*! ./helpers/normalizeHeaderName */ './node_modules/axios/lib/helpers/normalizeHeaderName.js'
          )

          var DEFAULT_CONTENT_TYPE = {
            'Content-Type': 'application/x-www-form-urlencoded',
          }

          function setContentTypeIfUnset(headers, value) {
            if (
              !utils.isUndefined(headers) &&
              utils.isUndefined(headers['Content-Type'])
            ) {
              headers['Content-Type'] = value
            }
          }

          function getDefaultAdapter() {
            var adapter
            if (typeof XMLHttpRequest !== 'undefined') {
              // For browsers use XHR adapter
              adapter = __webpack_require__(
                /*! ./adapters/xhr */ './node_modules/axios/lib/adapters/xhr.js'
              )
            } else if (
              typeof process !== 'undefined' &&
              Object.prototype.toString.call(process) === '[object process]'
            ) {
              // For node use HTTP adapter
              adapter = __webpack_require__(
                /*! ./adapters/http */ './node_modules/axios/lib/adapters/xhr.js'
              )
            }
            return adapter
          }

          var defaults = {
            adapter: getDefaultAdapter(),

            transformRequest: [
              function transformRequest(data, headers) {
                normalizeHeaderName(headers, 'Accept')
                normalizeHeaderName(headers, 'Content-Type')
                if (
                  utils.isFormData(data) ||
                  utils.isArrayBuffer(data) ||
                  utils.isBuffer(data) ||
                  utils.isStream(data) ||
                  utils.isFile(data) ||
                  utils.isBlob(data)
                ) {
                  return data
                }
                if (utils.isArrayBufferView(data)) {
                  return data.buffer
                }
                if (utils.isURLSearchParams(data)) {
                  setContentTypeIfUnset(
                    headers,
                    'application/x-www-form-urlencoded;charset=utf-8'
                  )
                  return data.toString()
                }
                if (utils.isObject(data)) {
                  setContentTypeIfUnset(
                    headers,
                    'application/json;charset=utf-8'
                  )
                  return JSON.stringify(data)
                }
                return data
              },
            ],

            transformResponse: [
              function transformResponse(data) {
                /*eslint no-param-reassign:0*/
                if (typeof data === 'string') {
                  try {
                    data = JSON.parse(data)
                  } catch (e) {
                    /* Ignore */
                  }
                }
                return data
              },
            ],

            /**
             * A timeout in milliseconds to abort a request. If set to 0 (default) a
             * timeout is not created.
             */
            timeout: 0,

            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',

            maxContentLength: -1,
            maxBodyLength: -1,

            validateStatus: function validateStatus(status) {
              return status >= 200 && status < 300
            },
          }

          defaults.headers = {
            common: {
              Accept: 'application/json, text/plain, */*',
            },
          }

          utils.forEach(
            ['delete', 'get', 'head'],
            function forEachMethodNoData(method) {
              defaults.headers[method] = {}
            }
          )

          utils.forEach(
            ['post', 'put', 'patch'],
            function forEachMethodWithData(method) {
              defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
            }
          )

          module.exports = defaults

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/bind.js':
        /*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
        /***/ (module) => {
          'use strict'

          module.exports = function bind(fn, thisArg) {
            return function wrap() {
              var args = new Array(arguments.length)
              for (var i = 0; i < args.length; i++) {
                args[i] = arguments[i]
              }
              return fn.apply(thisArg, args)
            }
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/buildURL.js':
        /*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          function encode(val) {
            return encodeURIComponent(val)
              .replace(/%3A/gi, ':')
              .replace(/%24/g, '$')
              .replace(/%2C/gi, ',')
              .replace(/%20/g, '+')
              .replace(/%5B/gi, '[')
              .replace(/%5D/gi, ']')
          }

          /**
           * Build a URL by appending params to the end
           *
           * @param {string} url The base of the url (e.g., http://www.google.com)
           * @param {object} [params] The params to be appended
           * @returns {string} The formatted url
           */
          module.exports = function buildURL(url, params, paramsSerializer) {
            /*eslint no-param-reassign:0*/
            if (!params) {
              return url
            }

            var serializedParams
            if (paramsSerializer) {
              serializedParams = paramsSerializer(params)
            } else if (utils.isURLSearchParams(params)) {
              serializedParams = params.toString()
            } else {
              var parts = []

              utils.forEach(params, function serialize(val, key) {
                if (val === null || typeof val === 'undefined') {
                  return
                }

                if (utils.isArray(val)) {
                  key = key + '[]'
                } else {
                  val = [val]
                }

                utils.forEach(val, function parseValue(v) {
                  if (utils.isDate(v)) {
                    v = v.toISOString()
                  } else if (utils.isObject(v)) {
                    v = JSON.stringify(v)
                  }
                  parts.push(encode(key) + '=' + encode(v))
                })
              })

              serializedParams = parts.join('&')
            }

            if (serializedParams) {
              var hashmarkIndex = url.indexOf('#')
              if (hashmarkIndex !== -1) {
                url = url.slice(0, hashmarkIndex)
              }

              url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
            }

            return url
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/combineURLs.js':
        /*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Creates a new URL by combining the specified URLs
           *
           * @param {string} baseURL The base URL
           * @param {string} relativeURL The relative URL
           * @returns {string} The combined URL
           */
          module.exports = function combineURLs(baseURL, relativeURL) {
            return relativeURL
              ? baseURL.replace(/\/+$/, '') +
                  '/' +
                  relativeURL.replace(/^\/+/, '')
              : baseURL
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/cookies.js':
        /*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          module.exports = utils.isStandardBrowserEnv()
            ? // Standard browser envs support document.cookie
              (function standardBrowserEnv() {
                return {
                  write: function write(
                    name,
                    value,
                    expires,
                    path,
                    domain,
                    secure
                  ) {
                    var cookie = []
                    cookie.push(name + '=' + encodeURIComponent(value))

                    if (utils.isNumber(expires)) {
                      cookie.push('expires=' + new Date(expires).toGMTString())
                    }

                    if (utils.isString(path)) {
                      cookie.push('path=' + path)
                    }

                    if (utils.isString(domain)) {
                      cookie.push('domain=' + domain)
                    }

                    if (secure === true) {
                      cookie.push('secure')
                    }

                    document.cookie = cookie.join('; ')
                  },

                  read: function read(name) {
                    var match = document.cookie.match(
                      new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
                    )
                    return match ? decodeURIComponent(match[3]) : null
                  },

                  remove: function remove(name) {
                    this.write(name, '', Date.now() - 86400000)
                  },
                }
              })()
            : // Non standard browser env (web workers, react-native) lack needed support.
              (function nonStandardBrowserEnv() {
                return {
                  write: function write() {},
                  read: function read() {
                    return null
                  },
                  remove: function remove() {},
                }
              })()

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/isAbsoluteURL.js':
        /*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Determines whether the specified URL is absolute
           *
           * @param {string} url The URL to test
           * @returns {boolean} True if the specified URL is absolute, otherwise false
           */
          module.exports = function isAbsoluteURL(url) {
            // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
            // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
            // by any combination of letters, digits, plus, period, or hyphen.
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/isAxiosError.js':
        /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Determines whether the payload is an error thrown by Axios
           *
           * @param {*} payload The value to test
           * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
           */
          module.exports = function isAxiosError(payload) {
            return typeof payload === 'object' && payload.isAxiosError === true
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/isURLSameOrigin.js':
        /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          module.exports = utils.isStandardBrowserEnv()
            ? // Standard browser envs have full support of the APIs needed to test
              // whether the request URL is of the same origin as current location.
              (function standardBrowserEnv() {
                var msie = /(msie|trident)/i.test(navigator.userAgent)
                var urlParsingNode = document.createElement('a')
                var originURL

                /**
                 * Parse a URL to discover it's components
                 *
                 * @param {String} url The URL to be parsed
                 * @returns {Object}
                 */
                function resolveURL(url) {
                  var href = url

                  if (msie) {
                    // IE needs attribute set twice to normalize properties
                    urlParsingNode.setAttribute('href', href)
                    href = urlParsingNode.href
                  }

                  urlParsingNode.setAttribute('href', href)

                  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                  return {
                    href: urlParsingNode.href,
                    protocol: urlParsingNode.protocol
                      ? urlParsingNode.protocol.replace(/:$/, '')
                      : '',
                    host: urlParsingNode.host,
                    search: urlParsingNode.search
                      ? urlParsingNode.search.replace(/^\?/, '')
                      : '',
                    hash: urlParsingNode.hash
                      ? urlParsingNode.hash.replace(/^#/, '')
                      : '',
                    hostname: urlParsingNode.hostname,
                    port: urlParsingNode.port,
                    pathname:
                      urlParsingNode.pathname.charAt(0) === '/'
                        ? urlParsingNode.pathname
                        : '/' + urlParsingNode.pathname,
                  }
                }

                originURL = resolveURL(window.location.href)

                /**
                 * Determine if a URL shares the same origin as the current location
                 *
                 * @param {String} requestURL The URL to test
                 * @returns {boolean} True if URL shares the same origin, otherwise false
                 */
                return function isURLSameOrigin(requestURL) {
                  var parsed = utils.isString(requestURL)
                    ? resolveURL(requestURL)
                    : requestURL
                  return (
                    parsed.protocol === originURL.protocol &&
                    parsed.host === originURL.host
                  )
                }
              })()
            : // Non standard browser envs (web workers, react-native) lack needed support.
              (function nonStandardBrowserEnv() {
                return function isURLSameOrigin() {
                  return true
                }
              })()

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/normalizeHeaderName.js':
        /*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ../utils */ './node_modules/axios/lib/utils.js'
          )

          module.exports = function normalizeHeaderName(
            headers,
            normalizedName
          ) {
            utils.forEach(headers, function processHeader(value, name) {
              if (
                name !== normalizedName &&
                name.toUpperCase() === normalizedName.toUpperCase()
              ) {
                headers[normalizedName] = value
                delete headers[name]
              }
            })
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/parseHeaders.js':
        /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          // Headers whose duplicates are ignored by node
          // c.f. https://nodejs.org/api/http.html#http_message_headers
          var ignoreDuplicateOf = [
            'age',
            'authorization',
            'content-length',
            'content-type',
            'etag',
            'expires',
            'from',
            'host',
            'if-modified-since',
            'if-unmodified-since',
            'last-modified',
            'location',
            'max-forwards',
            'proxy-authorization',
            'referer',
            'retry-after',
            'user-agent',
          ]

          /**
           * Parse headers into an object
           *
           * ```
           * Date: Wed, 27 Aug 2014 08:58:49 GMT
           * Content-Type: application/json
           * Connection: keep-alive
           * Transfer-Encoding: chunked
           * ```
           *
           * @param {String} headers Headers needing to be parsed
           * @returns {Object} Headers parsed into an object
           */
          module.exports = function parseHeaders(headers) {
            var parsed = {}
            var key
            var val
            var i

            if (!headers) {
              return parsed
            }

            utils.forEach(headers.split('\n'), function parser(line) {
              i = line.indexOf(':')
              key = utils.trim(line.substr(0, i)).toLowerCase()
              val = utils.trim(line.substr(i + 1))

              if (key) {
                if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                  return
                }
                if (key === 'set-cookie') {
                  parsed[key] = (parsed[key] ? parsed[key] : []).concat([val])
                } else {
                  parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
                }
              }
            })

            return parsed
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/spread.js':
        /*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Syntactic sugar for invoking a function and expanding an array for arguments.
           *
           * Common use case would be to use `Function.prototype.apply`.
           *
           *  ```js
           *  function f(x, y, z) {}
           *  var args = [1, 2, 3];
           *  f.apply(null, args);
           *  ```
           *
           * With `spread` this example can be re-written.
           *
           *  ```js
           *  spread(function(x, y, z) {})([1, 2, 3]);
           *  ```
           *
           * @param {Function} callback
           * @returns {Function}
           */
          module.exports = function spread(callback) {
            return function wrap(arr) {
              return callback.apply(null, arr)
            }
          }

          /***/
        },

      /***/ './node_modules/axios/lib/utils.js':
        /*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var bind = __webpack_require__(
            /*! ./helpers/bind */ './node_modules/axios/lib/helpers/bind.js'
          )

          /*global toString:true*/

          // utils is a library of generic helper functions non-specific to axios

          var toString = Object.prototype.toString

          /**
           * Determine if a value is an Array
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an Array, otherwise false
           */
          function isArray(val) {
            return toString.call(val) === '[object Array]'
          }

          /**
           * Determine if a value is undefined
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if the value is undefined, otherwise false
           */
          function isUndefined(val) {
            return typeof val === 'undefined'
          }

          /**
           * Determine if a value is a Buffer
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Buffer, otherwise false
           */
          function isBuffer(val) {
            return (
              val !== null &&
              !isUndefined(val) &&
              val.constructor !== null &&
              !isUndefined(val.constructor) &&
              typeof val.constructor.isBuffer === 'function' &&
              val.constructor.isBuffer(val)
            )
          }

          /**
           * Determine if a value is an ArrayBuffer
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an ArrayBuffer, otherwise false
           */
          function isArrayBuffer(val) {
            return toString.call(val) === '[object ArrayBuffer]'
          }

          /**
           * Determine if a value is a FormData
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an FormData, otherwise false
           */
          function isFormData(val) {
            return typeof FormData !== 'undefined' && val instanceof FormData
          }

          /**
           * Determine if a value is a view on an ArrayBuffer
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
           */
          function isArrayBufferView(val) {
            var result
            if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
              result = ArrayBuffer.isView(val)
            } else {
              result = val && val.buffer && val.buffer instanceof ArrayBuffer
            }
            return result
          }

          /**
           * Determine if a value is a String
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a String, otherwise false
           */
          function isString(val) {
            return typeof val === 'string'
          }

          /**
           * Determine if a value is a Number
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Number, otherwise false
           */
          function isNumber(val) {
            return typeof val === 'number'
          }

          /**
           * Determine if a value is an Object
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an Object, otherwise false
           */
          function isObject(val) {
            return val !== null && typeof val === 'object'
          }

          /**
           * Determine if a value is a plain Object
           *
           * @param {Object} val The value to test
           * @return {boolean} True if value is a plain Object, otherwise false
           */
          function isPlainObject(val) {
            if (toString.call(val) !== '[object Object]') {
              return false
            }

            var prototype = Object.getPrototypeOf(val)
            return prototype === null || prototype === Object.prototype
          }

          /**
           * Determine if a value is a Date
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Date, otherwise false
           */
          function isDate(val) {
            return toString.call(val) === '[object Date]'
          }

          /**
           * Determine if a value is a File
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a File, otherwise false
           */
          function isFile(val) {
            return toString.call(val) === '[object File]'
          }

          /**
           * Determine if a value is a Blob
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Blob, otherwise false
           */
          function isBlob(val) {
            return toString.call(val) === '[object Blob]'
          }

          /**
           * Determine if a value is a Function
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Function, otherwise false
           */
          function isFunction(val) {
            return toString.call(val) === '[object Function]'
          }

          /**
           * Determine if a value is a Stream
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Stream, otherwise false
           */
          function isStream(val) {
            return isObject(val) && isFunction(val.pipe)
          }

          /**
           * Determine if a value is a URLSearchParams object
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a URLSearchParams object, otherwise false
           */
          function isURLSearchParams(val) {
            return (
              typeof URLSearchParams !== 'undefined' &&
              val instanceof URLSearchParams
            )
          }

          /**
           * Trim excess whitespace off the beginning and end of a string
           *
           * @param {String} str The String to trim
           * @returns {String} The String freed of excess whitespace
           */
          function trim(str) {
            return str.replace(/^\s*/, '').replace(/\s*$/, '')
          }

          /**
           * Determine if we're running in a standard browser environment
           *
           * This allows axios to run in a web worker, and react-native.
           * Both environments support XMLHttpRequest, but not fully standard globals.
           *
           * web workers:
           *  typeof window -> undefined
           *  typeof document -> undefined
           *
           * react-native:
           *  navigator.product -> 'ReactNative'
           * nativescript
           *  navigator.product -> 'NativeScript' or 'NS'
           */
          function isStandardBrowserEnv() {
            if (
              typeof navigator !== 'undefined' &&
              (navigator.product === 'ReactNative' ||
                navigator.product === 'NativeScript' ||
                navigator.product === 'NS')
            ) {
              return false
            }
            return (
              typeof window !== 'undefined' && typeof document !== 'undefined'
            )
          }

          /**
           * Iterate over an Array or an Object invoking a function for each item.
           *
           * If `obj` is an Array callback will be called passing
           * the value, index, and complete array for each item.
           *
           * If 'obj' is an Object callback will be called passing
           * the value, key, and complete object for each property.
           *
           * @param {Object|Array} obj The object to iterate
           * @param {Function} fn The callback to invoke for each item
           */
          function forEach(obj, fn) {
            // Don't bother if no value provided
            if (obj === null || typeof obj === 'undefined') {
              return
            }

            // Force an array if not already something iterable
            if (typeof obj !== 'object') {
              /*eslint no-param-reassign:0*/
              obj = [obj]
            }

            if (isArray(obj)) {
              // Iterate over array values
              for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i], i, obj)
              }
            } else {
              // Iterate over object keys
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  fn.call(null, obj[key], key, obj)
                }
              }
            }
          }

          /**
           * Accepts varargs expecting each argument to be an object, then
           * immutably merges the properties of each object and returns result.
           *
           * When multiple objects contain the same key the later object in
           * the arguments list will take precedence.
           *
           * Example:
           *
           * ```js
           * var result = merge({foo: 123}, {foo: 456});
           * console.log(result.foo); // outputs 456
           * ```
           *
           * @param {Object} obj1 Object to merge
           * @returns {Object} Result of all merge properties
           */
          function merge(/* obj1, obj2, obj3, ... */) {
            var result = {}
            function assignValue(val, key) {
              if (isPlainObject(result[key]) && isPlainObject(val)) {
                result[key] = merge(result[key], val)
              } else if (isPlainObject(val)) {
                result[key] = merge({}, val)
              } else if (isArray(val)) {
                result[key] = val.slice()
              } else {
                result[key] = val
              }
            }

            for (var i = 0, l = arguments.length; i < l; i++) {
              forEach(arguments[i], assignValue)
            }
            return result
          }

          /**
           * Extends object a by mutably adding to it the properties of object b.
           *
           * @param {Object} a The object to be extended
           * @param {Object} b The object to copy properties from
           * @param {Object} thisArg The object to bind function to
           * @return {Object} The resulting value of object a
           */
          function extend(a, b, thisArg) {
            forEach(b, function assignValue(val, key) {
              if (thisArg && typeof val === 'function') {
                a[key] = bind(val, thisArg)
              } else {
                a[key] = val
              }
            })
            return a
          }

          /**
           * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
           *
           * @param {string} content with BOM
           * @return {string} content value without BOM
           */
          function stripBOM(content) {
            if (content.charCodeAt(0) === 0xfeff) {
              content = content.slice(1)
            }
            return content
          }

          module.exports = {
            isArray: isArray,
            isArrayBuffer: isArrayBuffer,
            isBuffer: isBuffer,
            isFormData: isFormData,
            isArrayBufferView: isArrayBufferView,
            isString: isString,
            isNumber: isNumber,
            isObject: isObject,
            isPlainObject: isPlainObject,
            isUndefined: isUndefined,
            isDate: isDate,
            isFile: isFile,
            isBlob: isBlob,
            isFunction: isFunction,
            isStream: isStream,
            isURLSearchParams: isURLSearchParams,
            isStandardBrowserEnv: isStandardBrowserEnv,
            forEach: forEach,
            merge: merge,
            extend: extend,
            trim: trim,
            stripBOM: stripBOM,
          }

          /***/
        },

      /***/ './node_modules/events/events.js':
        /*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
        /***/ (module) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var R = typeof Reflect === 'object' ? Reflect : null
          var ReflectApply =
            R && typeof R.apply === 'function'
              ? R.apply
              : function ReflectApply(target, receiver, args) {
                  return Function.prototype.apply.call(target, receiver, args)
                }

          var ReflectOwnKeys
          if (R && typeof R.ownKeys === 'function') {
            ReflectOwnKeys = R.ownKeys
          } else if (Object.getOwnPropertySymbols) {
            ReflectOwnKeys = function ReflectOwnKeys(target) {
              return Object.getOwnPropertyNames(target).concat(
                Object.getOwnPropertySymbols(target)
              )
            }
          } else {
            ReflectOwnKeys = function ReflectOwnKeys(target) {
              return Object.getOwnPropertyNames(target)
            }
          }

          function ProcessEmitWarning(warning) {
            if (console && console.warn) console.warn(warning)
          }

          var NumberIsNaN =
            Number.isNaN ||
            function NumberIsNaN(value) {
              return value !== value
            }

          function EventEmitter() {
            EventEmitter.init.call(this)
          }
          module.exports = EventEmitter
          module.exports.once = once

          // Backwards-compat with node 0.10.x
          EventEmitter.EventEmitter = EventEmitter

          EventEmitter.prototype._events = undefined
          EventEmitter.prototype._eventsCount = 0
          EventEmitter.prototype._maxListeners = undefined

          // By default EventEmitters will print a warning if more than 10 listeners are
          // added to it. This is a useful default which helps finding memory leaks.
          var defaultMaxListeners = 10

          function checkListener(listener) {
            if (typeof listener !== 'function') {
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  typeof listener
              )
            }
          }

          Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
            enumerable: true,
            get: function () {
              return defaultMaxListeners
            },
            set: function (arg) {
              if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    arg +
                    '.'
                )
              }
              defaultMaxListeners = arg
            },
          })

          EventEmitter.init = function () {
            if (
              this._events === undefined ||
              this._events === Object.getPrototypeOf(this)._events
            ) {
              this._events = Object.create(null)
              this._eventsCount = 0
            }

            this._maxListeners = this._maxListeners || undefined
          }

          // Obviously not all Emitters should be limited to 10. This function allows
          // that to be increased. Set to zero for unlimited.
          EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
            if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  n +
                  '.'
              )
            }
            this._maxListeners = n
            return this
          }

          function _getMaxListeners(that) {
            if (that._maxListeners === undefined)
              return EventEmitter.defaultMaxListeners
            return that._maxListeners
          }

          EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
            return _getMaxListeners(this)
          }

          EventEmitter.prototype.emit = function emit(type) {
            var args = []
            for (var i = 1; i < arguments.length; i++) args.push(arguments[i])
            var doError = type === 'error'

            var events = this._events
            if (events !== undefined)
              doError = doError && events.error === undefined
            else if (!doError) return false

            // If there is no 'error' event listener then throw.
            if (doError) {
              var er
              if (args.length > 0) er = args[0]
              if (er instanceof Error) {
                // Note: The comments on the `throw` lines are intentional, they show
                // up in Node's output if this results in an unhandled exception.
                throw er // Unhandled 'error' event
              }
              // At least give some kind of context to the user
              var err = new Error(
                'Unhandled error.' + (er ? ' (' + er.message + ')' : '')
              )
              err.context = er
              throw err // Unhandled 'error' event
            }

            var handler = events[type]

            if (handler === undefined) return false

            if (typeof handler === 'function') {
              ReflectApply(handler, this, args)
            } else {
              var len = handler.length
              var listeners = arrayClone(handler, len)
              for (var i = 0; i < len; ++i)
                ReflectApply(listeners[i], this, args)
            }

            return true
          }

          function _addListener(target, type, listener, prepend) {
            var m
            var events
            var existing

            checkListener(listener)

            events = target._events
            if (events === undefined) {
              events = target._events = Object.create(null)
              target._eventsCount = 0
            } else {
              // To avoid recursion in the case that type === "newListener"! Before
              // adding it to the listeners, first emit "newListener".
              if (events.newListener !== undefined) {
                target.emit(
                  'newListener',
                  type,
                  listener.listener ? listener.listener : listener
                )

                // Re-assign `events` because a newListener handler could have caused the
                // this._events to be assigned to a new object
                events = target._events
              }
              existing = events[type]
            }

            if (existing === undefined) {
              // Optimize the case of one listener. Don't need the extra array object.
              existing = events[type] = listener
              ++target._eventsCount
            } else {
              if (typeof existing === 'function') {
                // Adding the second element, need to change to array.
                existing = events[type] = prepend
                  ? [listener, existing]
                  : [existing, listener]
                // If we've already got an array, just append.
              } else if (prepend) {
                existing.unshift(listener)
              } else {
                existing.push(listener)
              }

              // Check for listener leak
              m = _getMaxListeners(target)
              if (m > 0 && existing.length > m && !existing.warned) {
                existing.warned = true
                // No error code for this since it is a Warning
                // eslint-disable-next-line no-restricted-syntax
                var w = new Error(
                  'Possible EventEmitter memory leak detected. ' +
                    existing.length +
                    ' ' +
                    String(type) +
                    ' listeners ' +
                    'added. Use emitter.setMaxListeners() to ' +
                    'increase limit'
                )
                w.name = 'MaxListenersExceededWarning'
                w.emitter = target
                w.type = type
                w.count = existing.length
                ProcessEmitWarning(w)
              }
            }

            return target
          }

          EventEmitter.prototype.addListener = function addListener(
            type,
            listener
          ) {
            return _addListener(this, type, listener, false)
          }

          EventEmitter.prototype.on = EventEmitter.prototype.addListener

          EventEmitter.prototype.prependListener = function prependListener(
            type,
            listener
          ) {
            return _addListener(this, type, listener, true)
          }

          function onceWrapper() {
            if (!this.fired) {
              this.target.removeListener(this.type, this.wrapFn)
              this.fired = true
              if (arguments.length === 0) return this.listener.call(this.target)
              return this.listener.apply(this.target, arguments)
            }
          }

          function _onceWrap(target, type, listener) {
            var state = {
              fired: false,
              wrapFn: undefined,
              target: target,
              type: type,
              listener: listener,
            }
            var wrapped = onceWrapper.bind(state)
            wrapped.listener = listener
            state.wrapFn = wrapped
            return wrapped
          }

          EventEmitter.prototype.once = function once(type, listener) {
            checkListener(listener)
            this.on(type, _onceWrap(this, type, listener))
            return this
          }

          EventEmitter.prototype.prependOnceListener =
            function prependOnceListener(type, listener) {
              checkListener(listener)
              this.prependListener(type, _onceWrap(this, type, listener))
              return this
            }

          // Emits a 'removeListener' event if and only if the listener was removed.
          EventEmitter.prototype.removeListener = function removeListener(
            type,
            listener
          ) {
            var list, events, position, i, originalListener

            checkListener(listener)

            events = this._events
            if (events === undefined) return this

            list = events[type]
            if (list === undefined) return this

            if (list === listener || list.listener === listener) {
              if (--this._eventsCount === 0) this._events = Object.create(null)
              else {
                delete events[type]
                if (events.removeListener)
                  this.emit('removeListener', type, list.listener || listener)
              }
            } else if (typeof list !== 'function') {
              position = -1

              for (i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                  originalListener = list[i].listener
                  position = i
                  break
                }
              }

              if (position < 0) return this

              if (position === 0) list.shift()
              else {
                spliceOne(list, position)
              }

              if (list.length === 1) events[type] = list[0]

              if (events.removeListener !== undefined)
                this.emit('removeListener', type, originalListener || listener)
            }

            return this
          }

          EventEmitter.prototype.off = EventEmitter.prototype.removeListener

          EventEmitter.prototype.removeAllListeners =
            function removeAllListeners(type) {
              var listeners, events, i

              events = this._events
              if (events === undefined) return this

              // not listening for removeListener, no need to emit
              if (events.removeListener === undefined) {
                if (arguments.length === 0) {
                  this._events = Object.create(null)
                  this._eventsCount = 0
                } else if (events[type] !== undefined) {
                  if (--this._eventsCount === 0)
                    this._events = Object.create(null)
                  else delete events[type]
                }
                return this
              }

              // emit removeListener for all listeners on all events
              if (arguments.length === 0) {
                var keys = Object.keys(events)
                var key
                for (i = 0; i < keys.length; ++i) {
                  key = keys[i]
                  if (key === 'removeListener') continue
                  this.removeAllListeners(key)
                }
                this.removeAllListeners('removeListener')
                this._events = Object.create(null)
                this._eventsCount = 0
                return this
              }

              listeners = events[type]

              if (typeof listeners === 'function') {
                this.removeListener(type, listeners)
              } else if (listeners !== undefined) {
                // LIFO order
                for (i = listeners.length - 1; i >= 0; i--) {
                  this.removeListener(type, listeners[i])
                }
              }

              return this
            }

          function _listeners(target, type, unwrap) {
            var events = target._events

            if (events === undefined) return []

            var evlistener = events[type]
            if (evlistener === undefined) return []

            if (typeof evlistener === 'function')
              return unwrap ? [evlistener.listener || evlistener] : [evlistener]

            return unwrap
              ? unwrapListeners(evlistener)
              : arrayClone(evlistener, evlistener.length)
          }

          EventEmitter.prototype.listeners = function listeners(type) {
            return _listeners(this, type, true)
          }

          EventEmitter.prototype.rawListeners = function rawListeners(type) {
            return _listeners(this, type, false)
          }

          EventEmitter.listenerCount = function (emitter, type) {
            if (typeof emitter.listenerCount === 'function') {
              return emitter.listenerCount(type)
            } else {
              return listenerCount.call(emitter, type)
            }
          }

          EventEmitter.prototype.listenerCount = listenerCount
          function listenerCount(type) {
            var events = this._events

            if (events !== undefined) {
              var evlistener = events[type]

              if (typeof evlistener === 'function') {
                return 1
              } else if (evlistener !== undefined) {
                return evlistener.length
              }
            }

            return 0
          }

          EventEmitter.prototype.eventNames = function eventNames() {
            return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : []
          }

          function arrayClone(arr, n) {
            var copy = new Array(n)
            for (var i = 0; i < n; ++i) copy[i] = arr[i]
            return copy
          }

          function spliceOne(list, index) {
            for (; index + 1 < list.length; index++)
              list[index] = list[index + 1]
            list.pop()
          }

          function unwrapListeners(arr) {
            var ret = new Array(arr.length)
            for (var i = 0; i < ret.length; ++i) {
              ret[i] = arr[i].listener || arr[i]
            }
            return ret
          }

          function once(emitter, name) {
            return new Promise(function (resolve, reject) {
              function errorListener(err) {
                emitter.removeListener(name, resolver)
                reject(err)
              }

              function resolver() {
                if (typeof emitter.removeListener === 'function') {
                  emitter.removeListener('error', errorListener)
                }
                resolve([].slice.call(arguments))
              }

              eventTargetAgnosticAddListener(emitter, name, resolver, {
                once: true,
              })
              if (name !== 'error') {
                addErrorHandlerIfEventEmitter(emitter, errorListener, {
                  once: true,
                })
              }
            })
          }

          function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
            if (typeof emitter.on === 'function') {
              eventTargetAgnosticAddListener(emitter, 'error', handler, flags)
            }
          }

          function eventTargetAgnosticAddListener(
            emitter,
            name,
            listener,
            flags
          ) {
            if (typeof emitter.on === 'function') {
              if (flags.once) {
                emitter.once(name, listener)
              } else {
                emitter.on(name, listener)
              }
            } else if (typeof emitter.addEventListener === 'function') {
              // EventTarget does not have `error` event semantics like Node
              // EventEmitters, we do not listen for `error` events here.
              emitter.addEventListener(name, function wrapListener(arg) {
                // IE does not have builtin `{ once: true }` support so we
                // have to do it manually.
                if (flags.once) {
                  emitter.removeEventListener(name, wrapListener)
                }
                listener(arg)
              })
            } else {
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof emitter
              )
            }
          }

          /***/
        },

      /***/ './node_modules/form-data/lib/browser.js':
        /*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
        /***/ (module) => {
          /* eslint-env browser */
          module.exports =
            typeof self == 'object' ? self.FormData : window.FormData

          /***/
        },

      /***/ './node_modules/querystring/decode.js':
        /*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
        /***/ (module) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          // If obj.hasOwnProperty has been overridden, then calling
          // obj.hasOwnProperty(prop) will break.
          // See: https://github.com/joyent/node/issues/1707
          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop)
          }

          module.exports = function (qs, sep, eq, options) {
            sep = sep || '&'
            eq = eq || '='
            var obj = {}

            if (typeof qs !== 'string' || qs.length === 0) {
              return obj
            }

            var regexp = /\+/g
            qs = qs.split(sep)

            var maxKeys = 1000
            if (options && typeof options.maxKeys === 'number') {
              maxKeys = options.maxKeys
            }

            var len = qs.length
            // maxKeys <= 0 means that we should not limit keys count
            if (maxKeys > 0 && len > maxKeys) {
              len = maxKeys
            }

            for (var i = 0; i < len; ++i) {
              var x = qs[i].replace(regexp, '%20'),
                idx = x.indexOf(eq),
                kstr,
                vstr,
                k,
                v

              if (idx >= 0) {
                kstr = x.substr(0, idx)
                vstr = x.substr(idx + 1)
              } else {
                kstr = x
                vstr = ''
              }

              k = decodeURIComponent(kstr)
              v = decodeURIComponent(vstr)

              if (!hasOwnProperty(obj, k)) {
                obj[k] = v
              } else if (Array.isArray(obj[k])) {
                obj[k].push(v)
              } else {
                obj[k] = [obj[k], v]
              }
            }

            return obj
          }

          /***/
        },

      /***/ './node_modules/querystring/encode.js':
        /*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
        /***/ (module) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var stringifyPrimitive = function (v) {
            switch (typeof v) {
              case 'string':
                return v

              case 'boolean':
                return v ? 'true' : 'false'

              case 'number':
                return isFinite(v) ? v : ''

              default:
                return ''
            }
          }

          module.exports = function (obj, sep, eq, name) {
            sep = sep || '&'
            eq = eq || '='
            if (obj === null) {
              obj = undefined
            }

            if (typeof obj === 'object') {
              return Object.keys(obj)
                .map(function (k) {
                  var ks = encodeURIComponent(stringifyPrimitive(k)) + eq
                  if (Array.isArray(obj[k])) {
                    return obj[k]
                      .map(function (v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v))
                      })
                      .join(sep)
                  } else {
                    return ks + encodeURIComponent(stringifyPrimitive(obj[k]))
                  }
                })
                .join(sep)
            }

            if (!name) return ''
            return (
              encodeURIComponent(stringifyPrimitive(name)) +
              eq +
              encodeURIComponent(stringifyPrimitive(obj))
            )
          }

          /***/
        },

      /***/ './node_modules/querystring/index.js':
        /*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          exports.decode = exports.parse = __webpack_require__(
            /*! ./decode */ './node_modules/querystring/decode.js'
          )
          exports.encode = exports.stringify = __webpack_require__(
            /*! ./encode */ './node_modules/querystring/encode.js'
          )

          /***/
        },

      /***/ './src/album/getAlbum.ts':
        /*!*******************************!*\
  !*** ./src/album/getAlbum.ts ***!
  \*******************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getAlbum = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function getAlbum(client, albumHash) {
            const url = `${endpoints_1.ALBUM_ENDPOINT}/${albumHash}`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url })
            )
          }
          exports.getAlbum = getAlbum

          /***/
        },

      /***/ './src/album/index.ts':
        /*!****************************!*\
  !*** ./src/album/index.ts ***!
  \****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          tslib_1.__exportStar(
            __webpack_require__(/*! ./getAlbum */ './src/album/getAlbum.ts'),
            exports
          )

          /***/
        },

      /***/ './src/client.ts':
        /*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.ImgurClient = void 0
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          const events_1 = __webpack_require__(
            /*! events */ './node_modules/events/events.js'
          )
          const getAuthorizationHeader_1 = __webpack_require__(
            /*! ./getAuthorizationHeader */ './src/getAuthorizationHeader.ts'
          )
          const image_1 = __webpack_require__(
            /*! ./image */ './src/image/index.ts'
          )
          const gallery_1 = __webpack_require__(
            /*! ./gallery */ './src/gallery/index.ts'
          )
          const album_1 = __webpack_require__(
            /*! ./album */ './src/album/index.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ./common/endpoints */ './src/common/endpoints.ts'
          )
          const USERAGENT =
            'imgur/next (https://github.com/kaimallea/node-imgur)'
          const axios_1 = tslib_1.__importDefault(
            __webpack_require__(/*! axios */ './node_modules/axios/index.js')
          )
          class ImgurClient extends events_1.EventEmitter {
            constructor(credentials) {
              super()
              this.credentials = credentials
              this.plainFetcher = axios_1.default.create({
                baseURL: endpoints_1.IMGUR_API_PREFIX,
                headers: {
                  'user-agent': USERAGENT,
                },
                responseType: 'json',
              })
              this.fetcher = axios_1.default.create({
                baseURL: endpoints_1.IMGUR_API_PREFIX,
                headers: {
                  'user-agent': USERAGENT,
                },
                responseType: 'json',
              })
              this.fetcher.interceptors.request.use(
                async (config) => {
                  config.headers = config.headers ? config.headers : {}
                  config.headers.authorization =
                    await getAuthorizationHeader_1.getAuthorizationHeader(this)
                  return config
                },
                (e) => Promise.reject(e)
              )
            }
            plainRequest(options) {
              return this.plainFetcher(options)
            }
            request(options = {}) {
              return this.fetcher(options)
            }
            deleteImage(imageHash) {
              return image_1.deleteImage(this, imageHash)
            }
            favoriteImage(imageHash) {
              return image_1.favoriteImage(this, imageHash)
            }
            getAlbum(albumHash) {
              return album_1.getAlbum(this, albumHash)
            }
            getGallery(options) {
              return gallery_1.getGallery(this, options)
            }
            getSubredditGallery(options) {
              return gallery_1.getSubredditGallery(this, options)
            }
            searchGallery(options) {
              return gallery_1.searchGallery(this, options)
            }
            getImage(imageHash) {
              return image_1.getImage(this, imageHash)
            }
            updateImage(payload) {
              return image_1.updateImage(this, payload)
            }
            upload(payload) {
              return image_1.upload(this, payload)
            }
          }
          exports.ImgurClient = ImgurClient

          /***/
        },

      /***/ './src/common/endpoints.ts':
        /*!*********************************!*\
  !*** ./src/common/endpoints.ts ***!
  \*********************************/
        /***/ (__unused_webpack_module, exports) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.SEARCH_GALLERY_ENDPOINT =
            exports.SUBREDDIT_GALLERY_ENDPOINT =
            exports.GALLERY_ENDPOINT =
            exports.UPLOAD_ENDPOINT =
            exports.IMAGE_ENDPOINT =
            exports.ALBUM_ENDPOINT =
            exports.AUTHORIZE_ENDPOINT =
            exports.API_VERSION =
            exports.IMGUR_API_PREFIX =
              void 0
          exports.IMGUR_API_PREFIX = 'https://api.imgur.com'
          exports.API_VERSION = '3'
          exports.AUTHORIZE_ENDPOINT = 'oauth2/authorize'
          exports.ALBUM_ENDPOINT = `${exports.API_VERSION}/album`
          exports.IMAGE_ENDPOINT = `${exports.API_VERSION}/image`
          exports.UPLOAD_ENDPOINT = `${exports.API_VERSION}/upload`
          exports.GALLERY_ENDPOINT = `${exports.API_VERSION}/gallery`
          exports.SUBREDDIT_GALLERY_ENDPOINT = `${exports.API_VERSION}/gallery/r`
          exports.SEARCH_GALLERY_ENDPOINT = `${exports.API_VERSION}/gallery/search`

          /***/
        },

      /***/ './src/common/types.ts':
        /*!*****************************!*\
  !*** ./src/common/types.ts ***!
  \*****************************/
        /***/ (__unused_webpack_module, exports) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.isLogin = exports.isClientId = exports.isAccessToken = void 0
          function isAccessToken(arg) {
            return arg.accessToken !== undefined
          }
          exports.isAccessToken = isAccessToken
          function isClientId(arg) {
            return arg.clientId !== undefined
          }
          exports.isClientId = isClientId
          function isLogin(arg) {
            return (
              arg.clientId !== undefined &&
              arg.username !== undefined &&
              arg.password !== undefined
            )
          }
          exports.isLogin = isLogin

          /***/
        },

      /***/ './src/common/utils.ts':
        /*!*****************************!*\
  !*** ./src/common/utils.ts ***!
  \*****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getImgurApiResponseFromResponse =
            exports.createForm =
            exports.getSource =
            exports.isStream =
            exports.isImageUrl =
            exports.isBase64 =
              void 0
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          const form_data_1 = tslib_1.__importDefault(
            __webpack_require__(
              /*! form-data */ './node_modules/form-data/lib/browser.js'
            )
          )
          function isBase64(payload) {
            if (typeof payload === 'string') {
              return false
            }
            return (
              typeof payload.base64 !== 'undefined' && payload.type === 'base64'
            )
          }
          exports.isBase64 = isBase64
          function isImageUrl(payload) {
            if (typeof payload === 'string') {
              return true
            }
            return (
              typeof payload.image !== 'undefined' && payload.type === 'url'
            )
          }
          exports.isImageUrl = isImageUrl
          function isStream(payload) {
            if (typeof payload === 'string') {
              return false
            }
            return typeof payload.stream !== 'undefined'
          }
          exports.isStream = isStream
          // TODO: Refactor this to be a unique name of some kind (a hash?)
          function getSource(payload) {
            if (typeof payload === 'string') {
              return payload
            }
            if (isBase64(payload)) {
              return 'payload.base64'
            } else if (isStream(payload)) {
              return 'payload.stream'
            } else {
              return payload.image
            }
          }
          exports.getSource = getSource
          function createForm(payload) {
            const form = new form_data_1.default()
            if (typeof payload === 'string') {
              form.append('image', payload)
              return form
            }
            for (const [key, value] of Object.entries(payload)) {
              const supportedUploadObjectTypes = ['base64', 'stream']
              if (supportedUploadObjectTypes.indexOf(key) !== -1) {
                if (supportedUploadObjectTypes.indexOf(payload.type) !== -1) {
                  form.append(key, payload)
                }
              } else {
                form.append(key, value)
              }
            }
            return form
          }
          exports.createForm = createForm
          function getImgurApiResponseFromResponse(response) {
            var _a, _b
            if (
              typeof ((_a = response.data) === null || _a === void 0
                ? void 0
                : _a.status) !== 'undefined' &&
              typeof ((_b = response.data) === null || _b === void 0
                ? void 0
                : _b.success) !== 'undefined'
            ) {
              return response.data
            }
            return {
              data: response.data,
              status: response.status,
              // TODO: determine the success of the call?
              success: true,
            }
          }
          exports.getImgurApiResponseFromResponse =
            getImgurApiResponseFromResponse

          /***/
        },

      /***/ './src/gallery/getGallery.ts':
        /*!***********************************!*\
  !*** ./src/gallery/getGallery.ts ***!
  \***********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getGallery = exports.constructGalleryUrl = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const url_1 = __webpack_require__(
            /*! url */ './node_modules/url/url.js'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const defaultOptions = {
            section: 'hot',
            sort: 'viral',
          }
          function constructGalleryUrl(options) {
            const mergedOptions = Object.assign({}, defaultOptions, options)
            let uri = `${mergedOptions.section}`
            if (mergedOptions.sort) {
              uri += `/${mergedOptions.sort}`
            }
            if (mergedOptions.section === 'top' && mergedOptions.window) {
              uri += `/${mergedOptions.window}`
            }
            if (mergedOptions.page) {
              uri += `/${mergedOptions.page}`
            }
            const url = new url_1.URL(
              `${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.GALLERY_ENDPOINT}/${uri}`
            )
            if (mergedOptions.showViral !== undefined) {
              url.searchParams.append(
                'showViral',
                mergedOptions.showViral.toString()
              )
            }
            if (mergedOptions.mature !== undefined) {
              url.searchParams.append('mature', mergedOptions.mature.toString())
            }
            if (mergedOptions.album_previews !== undefined) {
              url.searchParams.append(
                'album_previews',
                mergedOptions.album_previews.toString()
              )
            }
            return url
          }
          exports.constructGalleryUrl = constructGalleryUrl
          async function getGallery(client, options = defaultOptions) {
            const { pathname } = constructGalleryUrl(options)
            // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
            const finalPathname = pathname.slice(1)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url: finalPathname })
            )
          }
          exports.getGallery = getGallery

          /***/
        },

      /***/ './src/gallery/getSubredditGallery.ts':
        /*!********************************************!*\
  !*** ./src/gallery/getSubredditGallery.ts ***!
  \********************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getSubredditGallery = exports.constructSubredditGalleryUrl =
            void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const url_1 = __webpack_require__(
            /*! url */ './node_modules/url/url.js'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          function constructSubredditGalleryUrl(options) {
            let uri = `${options.subreddit}`
            if (options.sort) {
              uri += `/${options.sort}`
            }
            if (options.sort === 'top' && options.window) {
              uri += `/${options.window}`
            }
            if (options.page) {
              uri += `/${options.page}`
            }
            const url = new url_1.URL(
              `${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.SUBREDDIT_GALLERY_ENDPOINT}/${uri}`
            )
            return url
          }
          exports.constructSubredditGalleryUrl = constructSubredditGalleryUrl
          async function getSubredditGallery(client, options) {
            const { pathname } = constructSubredditGalleryUrl(options)
            // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
            const finalPathname = pathname.slice(1)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url: finalPathname })
            )
          }
          exports.getSubredditGallery = getSubredditGallery

          /***/
        },

      /***/ './src/gallery/index.ts':
        /*!******************************!*\
  !*** ./src/gallery/index.ts ***!
  \******************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./getGallery */ './src/gallery/getGallery.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./getSubredditGallery */ './src/gallery/getSubredditGallery.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./searchGallery */ './src/gallery/searchGallery.ts'
            ),
            exports
          )

          /***/
        },

      /***/ './src/gallery/searchGallery.ts':
        /*!**************************************!*\
  !*** ./src/gallery/searchGallery.ts ***!
  \**************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.searchGallery = exports.constructSearchGalleryUrl = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const url_1 = __webpack_require__(
            /*! url */ './node_modules/url/url.js'
          )
          const advancedParameters = [
            'q_all',
            'q_any',
            'q_exactly',
            'q_not',
            'q_type',
            'q_size_px',
          ]
          function constructSearchGalleryUrl(options) {
            let uri = ''
            if (options.sort) {
              uri += `/${options.sort}`
            }
            if (options.sort === 'top' && options.window) {
              uri += `/${options.window}`
            }
            if (options.page) {
              uri += `/${options.page}`
            }
            const url = new url_1.URL(
              `${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.SEARCH_GALLERY_ENDPOINT}${uri}`
            )
            advancedParameters.forEach((param) => {
              var _a
              if (
                (_a = options[param]) === null || _a === void 0
                  ? void 0
                  : _a.length
              ) {
                url.searchParams.append(param, options[param])
              }
            })
            if (!url.search) {
              const query = options.q || options.query
              if (!query) {
                throw new Error('No query was provided')
              }
              url.searchParams.append('q', query)
            }
            return url
          }
          exports.constructSearchGalleryUrl = constructSearchGalleryUrl
          async function searchGallery(client, options) {
            const { pathname } = constructSearchGalleryUrl(options)
            // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
            const finalPathname = pathname.slice(1)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url: finalPathname })
            )
          }
          exports.searchGallery = searchGallery

          /***/
        },

      /***/ './src/getAuthorizationHeader.ts':
        /*!***************************************!*\
  !*** ./src/getAuthorizationHeader.ts ***!
  \***************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getAuthorizationHeader = void 0
          const types_1 = __webpack_require__(
            /*! ./common/types */ './src/common/types.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ./common/endpoints */ './src/common/endpoints.ts'
          )
          async function getAuthorizationHeader(client) {
            if (types_1.isAccessToken(client.credentials)) {
              return `Bearer ${client.credentials.accessToken}`
            }
            if (
              types_1.isClientId(client.credentials) &&
              !types_1.isLogin(client.credentials)
            ) {
              return `Client-ID ${client.credentials.clientId}`
            }
            const { clientId, username, password } = client.credentials
            const options = {
              url: endpoints_1.AUTHORIZE_ENDPOINT,
              baseURL: endpoints_1.IMGUR_API_PREFIX,
              params: {
                client_id: clientId,
                response_type: 'token',
              },
            }
            let response = await client.plainRequest(options)
            const cookies = Array.isArray(response.headers['set-cookie'])
              ? response.headers['set-cookie'][0]
              : response.headers['set-cookie']
            if (!cookies) {
              throw new Error('No cookies were set during authorization')
            }
            const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)')
            if (!matches || matches.length < 3) {
              throw new Error('Unable to find authorize_token cookie')
            }
            const authorizeToken = matches[2]
            options.method = 'POST'
            options.data = {
              username,
              password,
              allow: authorizeToken,
            }
            options.followRedirect = false
            options.headers = {
              cookie: `authorize_token=${authorizeToken}`,
            }
            response = await client.plainRequest(options)
            const location = response.headers.location
            if (!location) {
              throw new Error('Unable to parse location')
            }
            const token = JSON.parse(
              '{"' +
                decodeURI(location.slice(location.indexOf('#') + 1))
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"') +
                '"}'
            )
            const accessToken = token.access_token
            client.credentials.accessToken = accessToken
            return `Bearer ${accessToken}`
          }
          exports.getAuthorizationHeader = getAuthorizationHeader

          /***/
        },

      /***/ './src/image/deleteImage.ts':
        /*!**********************************!*\
  !*** ./src/image/deleteImage.ts ***!
  \**********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.deleteImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function deleteImage(client, imageHash) {
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url, method: 'DELETE' })
            )
          }
          exports.deleteImage = deleteImage

          /***/
        },

      /***/ './src/image/favoriteImage.ts':
        /*!************************************!*\
  !*** ./src/image/favoriteImage.ts ***!
  \************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.favoriteImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function favoriteImage(client, imageHash) {
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}/favorite`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url, method: 'POST' })
            )
          }
          exports.favoriteImage = favoriteImage

          /***/
        },

      /***/ './src/image/getImage.ts':
        /*!*******************************!*\
  !*** ./src/image/getImage.ts ***!
  \*******************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function getImage(client, imageHash) {
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url })
            )
          }
          exports.getImage = getImage

          /***/
        },

      /***/ './src/image/index.ts':
        /*!****************************!*\
  !*** ./src/image/index.ts ***!
  \****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./deleteImage */ './src/image/deleteImage.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./favoriteImage */ './src/image/favoriteImage.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(/*! ./getImage */ './src/image/getImage.ts'),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./updateImage */ './src/image/updateImage.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(/*! ./upload */ './src/image/upload.ts'),
            exports
          )

          /***/
        },

      /***/ './src/image/updateImage.ts':
        /*!**********************************!*\
  !*** ./src/image/updateImage.ts ***!
  \**********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.updateImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          function isValidUpdatePayload(p) {
            return (
              typeof p.title === 'string' || typeof p.description === 'string'
            )
          }
          async function updateImage(client, payload) {
            if (Array.isArray(payload)) {
              const promises = payload.map((p) => {
                if (!isValidUpdatePayload(p)) {
                  throw new Error('Update requires a title and/or description')
                }
                const url = `${endpoints_1.IMAGE_ENDPOINT}/${p.imageHash}`
                const form = utils_1.createForm(p)
                /* eslint no-async-promise-executor: 0 */
                return new Promise(async function (resolve) {
                  return resolve(
                    utils_1.getImgurApiResponseFromResponse(
                      await client.request({
                        url,
                        method: 'POST',
                        data: form,
                        // resolveBodyOnly: true,
                      })
                    )
                  )
                })
              })
              return await Promise.all(promises)
            }
            if (!isValidUpdatePayload(payload)) {
              throw new Error('Update requires a title and/or description')
            }
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${payload.imageHash}`
            const form = utils_1.createForm(payload)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({
                url,
                method: 'POST',
                data: form,
                // resolveBodyOnly: true,
              })
            )
          }
          exports.updateImage = updateImage

          /***/
        },

      /***/ './src/image/upload.ts':
        /*!*****************************!*\
  !*** ./src/image/upload.ts ***!
  \*****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.upload = void 0
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          async function upload(client, payload) {
            if (Array.isArray(payload)) {
              const promises = payload.map((p) => {
                const form = utils_1.createForm(p)
                /* eslint no-async-promise-executor: 0 */
                return new Promise(async (resolve) => {
                  resolve(
                    utils_1.getImgurApiResponseFromResponse(
                      await client.request({
                        url: endpoints_1.UPLOAD_ENDPOINT,
                        method: 'POST',
                        data: form,
                        onUploadProgress: (progressEvent) => {
                          console.log({ progressEvent })
                          client.emit('uploadProgress', { ...progressEvent })
                        },
                      })
                    )
                  )
                })
              })
              return await Promise.all(promises)
            }
            const form = utils_1.createForm(payload)
            // const id = Date.now.toString();
            const request = await client.request({
              url: endpoints_1.UPLOAD_ENDPOINT,
              method: 'POST',
              data: form,
              onUploadProgress: (progressEvent) => {
                console.log({ progressEvent })
                client.emit('uploadProgress', { ...progressEvent })
              },
            })
            return Promise.resolve(
              utils_1.getImgurApiResponseFromResponse(request)
            )
          }
          exports.upload = upload

          /***/
        },

      /***/ './node_modules/tslib/tslib.es6.js':
        /*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__
        ) => {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ __extends: () => /* binding */ __extends,
            /* harmony export */ __assign: () => /* binding */ __assign,
            /* harmony export */ __rest: () => /* binding */ __rest,
            /* harmony export */ __decorate: () => /* binding */ __decorate,
            /* harmony export */ __param: () => /* binding */ __param,
            /* harmony export */ __metadata: () => /* binding */ __metadata,
            /* harmony export */ __awaiter: () => /* binding */ __awaiter,
            /* harmony export */ __generator: () => /* binding */ __generator,
            /* harmony export */ __createBinding: () =>
              /* binding */ __createBinding,
            /* harmony export */ __exportStar: () => /* binding */ __exportStar,
            /* harmony export */ __values: () => /* binding */ __values,
            /* harmony export */ __read: () => /* binding */ __read,
            /* harmony export */ __spread: () => /* binding */ __spread,
            /* harmony export */ __spreadArrays: () =>
              /* binding */ __spreadArrays,
            /* harmony export */ __await: () => /* binding */ __await,
            /* harmony export */ __asyncGenerator: () =>
              /* binding */ __asyncGenerator,
            /* harmony export */ __asyncDelegator: () =>
              /* binding */ __asyncDelegator,
            /* harmony export */ __asyncValues: () =>
              /* binding */ __asyncValues,
            /* harmony export */ __makeTemplateObject: () =>
              /* binding */ __makeTemplateObject,
            /* harmony export */ __importStar: () => /* binding */ __importStar,
            /* harmony export */ __importDefault: () =>
              /* binding */ __importDefault,
            /* harmony export */ __classPrivateFieldGet: () =>
              /* binding */ __classPrivateFieldGet,
            /* harmony export */ __classPrivateFieldSet: () =>
              /* binding */ __classPrivateFieldSet,
            /* harmony export */
          })
          /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
          /* global Reflect, Promise */

          var extendStatics = function (d, b) {
            extendStatics =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (d, b) {
                  d.__proto__ = b
                }) ||
              function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
              }
            return extendStatics(d, b)
          }

          function __extends(d, b) {
            extendStatics(d, b)
            function __() {
              this.constructor = d
            }
            d.prototype =
              b === null
                ? Object.create(b)
                : ((__.prototype = b.prototype), new __())
          }

          var __assign = function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i]
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
                }
                return t
              }
            return __assign.apply(this, arguments)
          }

          function __rest(s, e) {
            var t = {}
            for (var p in s)
              if (
                Object.prototype.hasOwnProperty.call(s, p) &&
                e.indexOf(p) < 0
              )
                t[p] = s[p]
            if (s != null && typeof Object.getOwnPropertySymbols === 'function')
              for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
              ) {
                if (
                  e.indexOf(p[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                  t[p[i]] = s[p[i]]
              }
            return t
          }

          function __decorate(decorators, target, key, desc) {
            var c = arguments.length,
              r =
                c < 3
                  ? target
                  : desc === null
                  ? (desc = Object.getOwnPropertyDescriptor(target, key))
                  : desc,
              d
            if (
              typeof Reflect === 'object' &&
              typeof Reflect.decorate === 'function'
            )
              r = Reflect.decorate(decorators, target, key, desc)
            else
              for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                  r =
                    (c < 3
                      ? d(r)
                      : c > 3
                      ? d(target, key, r)
                      : d(target, key)) || r
            return c > 3 && r && Object.defineProperty(target, key, r), r
          }

          function __param(paramIndex, decorator) {
            return function (target, key) {
              decorator(target, key, paramIndex)
            }
          }

          function __metadata(metadataKey, metadataValue) {
            if (
              typeof Reflect === 'object' &&
              typeof Reflect.metadata === 'function'
            )
              return Reflect.metadata(metadataKey, metadataValue)
          }

          function __awaiter(thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value)
                  })
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value))
                } catch (e) {
                  reject(e)
                }
              }
              function rejected(value) {
                try {
                  step(generator['throw'](value))
                } catch (e) {
                  reject(e)
                }
              }
              function step(result) {
                result.done
                  ? resolve(result.value)
                  : adopt(result.value).then(fulfilled, rejected)
              }
              step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
              )
            })
          }

          function __generator(thisArg, body) {
            var _ = {
                label: 0,
                sent: function () {
                  if (t[0] & 1) throw t[1]
                  return t[1]
                },
                trys: [],
                ops: [],
              },
              f,
              y,
              t,
              g
            return (
              (g = { next: verb(0), throw: verb(1), return: verb(2) }),
              typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                  return this
                }),
              g
            )
            function verb(n) {
              return function (v) {
                return step([n, v])
              }
            }
            function step(op) {
              if (f) throw new TypeError('Generator is already executing.')
              while (_)
                try {
                  if (
                    ((f = 1),
                    y &&
                      (t =
                        op[0] & 2
                          ? y['return']
                          : op[0]
                          ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                          : y.next) &&
                      !(t = t.call(y, op[1])).done)
                  )
                    return t
                  if (((y = 0), t)) op = [op[0] & 2, t.value]
                  switch (op[0]) {
                    case 0:
                    case 1:
                      t = op
                      break
                    case 4:
                      _.label++
                      return { value: op[1], done: false }
                    case 5:
                      _.label++
                      y = op[1]
                      op = [0]
                      continue
                    case 7:
                      op = _.ops.pop()
                      _.trys.pop()
                      continue
                    default:
                      if (
                        !((t = _.trys),
                        (t = t.length > 0 && t[t.length - 1])) &&
                        (op[0] === 6 || op[0] === 2)
                      ) {
                        _ = 0
                        continue
                      }
                      if (
                        op[0] === 3 &&
                        (!t || (op[1] > t[0] && op[1] < t[3]))
                      ) {
                        _.label = op[1]
                        break
                      }
                      if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1]
                        t = op
                        break
                      }
                      if (t && _.label < t[2]) {
                        _.label = t[2]
                        _.ops.push(op)
                        break
                      }
                      if (t[2]) _.ops.pop()
                      _.trys.pop()
                      continue
                  }
                  op = body.call(thisArg, _)
                } catch (e) {
                  op = [6, e]
                  y = 0
                } finally {
                  f = t = 0
                }
              if (op[0] & 5) throw op[1]
              return { value: op[0] ? op[1] : void 0, done: true }
            }
          }

          function __createBinding(o, m, k, k2) {
            if (k2 === undefined) k2 = k
            o[k2] = m[k]
          }

          function __exportStar(m, exports) {
            for (var p in m)
              if (p !== 'default' && !exports.hasOwnProperty(p))
                exports[p] = m[p]
          }

          function __values(o) {
            var s = typeof Symbol === 'function' && Symbol.iterator,
              m = s && o[s],
              i = 0
            if (m) return m.call(o)
            if (o && typeof o.length === 'number')
              return {
                next: function () {
                  if (o && i >= o.length) o = void 0
                  return { value: o && o[i++], done: !o }
                },
              }
            throw new TypeError(
              s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            )
          }

          function __read(o, n) {
            var m = typeof Symbol === 'function' && o[Symbol.iterator]
            if (!m) return o
            var i = m.call(o),
              r,
              ar = [],
              e
            try {
              while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value)
            } catch (error) {
              e = { error: error }
            } finally {
              try {
                if (r && !r.done && (m = i['return'])) m.call(i)
              } finally {
                if (e) throw e.error
              }
            }
            return ar
          }

          function __spread() {
            for (var ar = [], i = 0; i < arguments.length; i++)
              ar = ar.concat(__read(arguments[i]))
            return ar
          }

          function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++)
              s += arguments[i].length
            for (var r = Array(s), k = 0, i = 0; i < il; i++)
              for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j]
            return r
          }

          function __await(v) {
            return this instanceof __await
              ? ((this.v = v), this)
              : new __await(v)
          }

          function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.')
            var g = generator.apply(thisArg, _arguments || []),
              i,
              q = []
            return (
              (i = {}),
              verb('next'),
              verb('throw'),
              verb('return'),
              (i[Symbol.asyncIterator] = function () {
                return this
              }),
              i
            )
            function verb(n) {
              if (g[n])
                i[n] = function (v) {
                  return new Promise(function (a, b) {
                    q.push([n, v, a, b]) > 1 || resume(n, v)
                  })
                }
            }
            function resume(n, v) {
              try {
                step(g[n](v))
              } catch (e) {
                settle(q[0][3], e)
              }
            }
            function step(r) {
              r.value instanceof __await
                ? Promise.resolve(r.value.v).then(fulfill, reject)
                : settle(q[0][2], r)
            }
            function fulfill(value) {
              resume('next', value)
            }
            function reject(value) {
              resume('throw', value)
            }
            function settle(f, v) {
              if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1])
            }
          }

          function __asyncDelegator(o) {
            var i, p
            return (
              (i = {}),
              verb('next'),
              verb('throw', function (e) {
                throw e
              }),
              verb('return'),
              (i[Symbol.iterator] = function () {
                return this
              }),
              i
            )
            function verb(n, f) {
              i[n] = o[n]
                ? function (v) {
                    return (p = !p)
                      ? { value: __await(o[n](v)), done: n === 'return' }
                      : f
                      ? f(v)
                      : v
                  }
                : f
            }
          }

          function __asyncValues(o) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.')
            var m = o[Symbol.asyncIterator],
              i
            return m
              ? m.call(o)
              : ((o =
                  typeof __values === 'function'
                    ? __values(o)
                    : o[Symbol.iterator]()),
                (i = {}),
                verb('next'),
                verb('throw'),
                verb('return'),
                (i[Symbol.asyncIterator] = function () {
                  return this
                }),
                i)
            function verb(n) {
              i[n] =
                o[n] &&
                function (v) {
                  return new Promise(function (resolve, reject) {
                    ;(v = o[n](v)), settle(resolve, reject, v.done, v.value)
                  })
                }
            }
            function settle(resolve, reject, d, v) {
              Promise.resolve(v).then(function (v) {
                resolve({ value: v, done: d })
              }, reject)
            }
          }

          function __makeTemplateObject(cooked, raw) {
            if (Object.defineProperty) {
              Object.defineProperty(cooked, 'raw', { value: raw })
            } else {
              cooked.raw = raw
            }
            return cooked
          }

          function __importStar(mod) {
            if (mod && mod.__esModule) return mod
            var result = {}
            if (mod != null)
              for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
            result.default = mod
            return result
          }

          function __importDefault(mod) {
            return mod && mod.__esModule ? mod : { default: mod }
          }

          function __classPrivateFieldGet(receiver, privateMap) {
            if (!privateMap.has(receiver)) {
              throw new TypeError(
                'attempted to get private field on non-instance'
              )
            }
            return privateMap.get(receiver)
          }

          function __classPrivateFieldSet(receiver, privateMap, value) {
            if (!privateMap.has(receiver)) {
              throw new TypeError(
                'attempted to set private field on non-instance'
              )
            }
            privateMap.set(receiver, value)
            return value
          }

          /***/
        },

      /***/ './node_modules/url/node_modules/punycode/punycode.js':
        /*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
        /***/ function (module, exports, __webpack_require__) {
          /* module decorator */ module = __webpack_require__.nmd(module)
          var __WEBPACK_AMD_DEFINE_RESULT__ /*! https://mths.be/punycode v1.3.2 by @mathias */
          ;(function (root) {
            /** Detect free variables */
            var freeExports = true && exports && !exports.nodeType && exports
            var freeModule = true && module && !module.nodeType && module
            var freeGlobal =
              typeof __webpack_require__.g == 'object' && __webpack_require__.g
            if (
              freeGlobal.global === freeGlobal ||
              freeGlobal.window === freeGlobal ||
              freeGlobal.self === freeGlobal
            ) {
              root = freeGlobal
            }

            /**
             * The `punycode` object.
             * @name punycode
             * @type Object
             */
            var punycode,
              /** Highest positive signed 32-bit float value */
              maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
              /** Bootstring parameters */
              base = 36,
              tMin = 1,
              tMax = 26,
              skew = 38,
              damp = 700,
              initialBias = 72,
              initialN = 128, // 0x80
              delimiter = '-', // '\x2D'
              /** Regular expressions */
              regexPunycode = /^xn--/,
              regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
              regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
              /** Error messages */
              errors = {
                overflow: 'Overflow: input needs wider integers to process',
                'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                'invalid-input': 'Invalid input',
              },
              /** Convenience shortcuts */
              baseMinusTMin = base - tMin,
              floor = Math.floor,
              stringFromCharCode = String.fromCharCode,
              /** Temporary variable */
              key

            /*--------------------------------------------------------------------------*/

            /**
             * A generic error utility function.
             * @private
             * @param {String} type The error type.
             * @returns {Error} Throws a `RangeError` with the applicable error message.
             */
            function error(type) {
              throw RangeError(errors[type])
            }

            /**
             * A generic `Array#map` utility function.
             * @private
             * @param {Array} array The array to iterate over.
             * @param {Function} callback The function that gets called for every array
             * item.
             * @returns {Array} A new array of values returned by the callback function.
             */
            function map(array, fn) {
              var length = array.length
              var result = []
              while (length--) {
                result[length] = fn(array[length])
              }
              return result
            }

            /**
             * A simple `Array#map`-like wrapper to work with domain name strings or email
             * addresses.
             * @private
             * @param {String} domain The domain name or email address.
             * @param {Function} callback The function that gets called for every
             * character.
             * @returns {Array} A new string of characters returned by the callback
             * function.
             */
            function mapDomain(string, fn) {
              var parts = string.split('@')
              var result = ''
              if (parts.length > 1) {
                // In email addresses, only the domain name should be punycoded. Leave
                // the local part (i.e. everything up to `@`) intact.
                result = parts[0] + '@'
                string = parts[1]
              }
              // Avoid `split(regex)` for IE8 compatibility. See #17.
              string = string.replace(regexSeparators, '\x2E')
              var labels = string.split('.')
              var encoded = map(labels, fn).join('.')
              return result + encoded
            }

            /**
             * Creates an array containing the numeric code points of each Unicode
             * character in the string. While JavaScript uses UCS-2 internally,
             * this function will convert a pair of surrogate halves (each of which
             * UCS-2 exposes as separate characters) into a single code point,
             * matching UTF-16.
             * @see `punycode.ucs2.encode`
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode.ucs2
             * @name decode
             * @param {String} string The Unicode input string (UCS-2).
             * @returns {Array} The new array of code points.
             */
            function ucs2decode(string) {
              var output = [],
                counter = 0,
                length = string.length,
                value,
                extra
              while (counter < length) {
                value = string.charCodeAt(counter++)
                if (value >= 0xd800 && value <= 0xdbff && counter < length) {
                  // high surrogate, and there is a next character
                  extra = string.charCodeAt(counter++)
                  if ((extra & 0xfc00) == 0xdc00) {
                    // low surrogate
                    output.push(
                      ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000
                    )
                  } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value)
                    counter--
                  }
                } else {
                  output.push(value)
                }
              }
              return output
            }

            /**
             * Creates a string based on an array of numeric code points.
             * @see `punycode.ucs2.decode`
             * @memberOf punycode.ucs2
             * @name encode
             * @param {Array} codePoints The array of numeric code points.
             * @returns {String} The new Unicode string (UCS-2).
             */
            function ucs2encode(array) {
              return map(array, function (value) {
                var output = ''
                if (value > 0xffff) {
                  value -= 0x10000
                  output += stringFromCharCode(
                    ((value >>> 10) & 0x3ff) | 0xd800
                  )
                  value = 0xdc00 | (value & 0x3ff)
                }
                output += stringFromCharCode(value)
                return output
              }).join('')
            }

            /**
             * Converts a basic code point into a digit/integer.
             * @see `digitToBasic()`
             * @private
             * @param {Number} codePoint The basic numeric code point value.
             * @returns {Number} The numeric value of a basic code point (for use in
             * representing integers) in the range `0` to `base - 1`, or `base` if
             * the code point does not represent a value.
             */
            function basicToDigit(codePoint) {
              if (codePoint - 48 < 10) {
                return codePoint - 22
              }
              if (codePoint - 65 < 26) {
                return codePoint - 65
              }
              if (codePoint - 97 < 26) {
                return codePoint - 97
              }
              return base
            }

            /**
             * Converts a digit/integer into a basic code point.
             * @see `basicToDigit()`
             * @private
             * @param {Number} digit The numeric value of a basic code point.
             * @returns {Number} The basic code point whose value (when used for
             * representing integers) is `digit`, which needs to be in the range
             * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
             * used; else, the lowercase form is used. The behavior is undefined
             * if `flag` is non-zero and `digit` has no uppercase form.
             */
            function digitToBasic(digit, flag) {
              //  0..25 map to ASCII a..z or A..Z
              // 26..35 map to ASCII 0..9
              return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5)
            }

            /**
             * Bias adaptation function as per section 3.4 of RFC 3492.
             * http://tools.ietf.org/html/rfc3492#section-3.4
             * @private
             */
            function adapt(delta, numPoints, firstTime) {
              var k = 0
              delta = firstTime ? floor(delta / damp) : delta >> 1
              delta += floor(delta / numPoints)
              for (
                ;
                /* no initialization */ delta > (baseMinusTMin * tMax) >> 1;
                k += base
              ) {
                delta = floor(delta / baseMinusTMin)
              }
              return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew))
            }

            /**
             * Converts a Punycode string of ASCII-only symbols to a string of Unicode
             * symbols.
             * @memberOf punycode
             * @param {String} input The Punycode string of ASCII-only symbols.
             * @returns {String} The resulting string of Unicode symbols.
             */
            function decode(input) {
              // Don't use UCS-2
              var output = [],
                inputLength = input.length,
                out,
                i = 0,
                n = initialN,
                bias = initialBias,
                basic,
                j,
                index,
                oldi,
                w,
                k,
                digit,
                t,
                /** Cached calculation results */
                baseMinusT

              // Handle the basic code points: let `basic` be the number of input code
              // points before the last delimiter, or `0` if there is none, then copy
              // the first basic code points to the output.

              basic = input.lastIndexOf(delimiter)
              if (basic < 0) {
                basic = 0
              }

              for (j = 0; j < basic; ++j) {
                // if it's not a basic code point
                if (input.charCodeAt(j) >= 0x80) {
                  error('not-basic')
                }
                output.push(input.charCodeAt(j))
              }

              // Main decoding loop: start just after the last delimiter if any basic code
              // points were copied; start at the beginning otherwise.

              for (
                index = basic > 0 ? basic + 1 : 0;
                index < inputLength /* no final expression */;

              ) {
                // `index` is the index of the next character to be consumed.
                // Decode a generalized variable-length integer into `delta`,
                // which gets added to `i`. The overflow checking is easier
                // if we increase `i` as we go, then subtract off its starting
                // value at the end to obtain `delta`.
                for (
                  oldi = i, w = 1, k = base /* no condition */;
                  ;
                  k += base
                ) {
                  if (index >= inputLength) {
                    error('invalid-input')
                  }

                  digit = basicToDigit(input.charCodeAt(index++))

                  if (digit >= base || digit > floor((maxInt - i) / w)) {
                    error('overflow')
                  }

                  i += digit * w
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias

                  if (digit < t) {
                    break
                  }

                  baseMinusT = base - t
                  if (w > floor(maxInt / baseMinusT)) {
                    error('overflow')
                  }

                  w *= baseMinusT
                }

                out = output.length + 1
                bias = adapt(i - oldi, out, oldi == 0)

                // `i` was supposed to wrap around from `out` to `0`,
                // incrementing `n` each time, so we'll fix that now:
                if (floor(i / out) > maxInt - n) {
                  error('overflow')
                }

                n += floor(i / out)
                i %= out

                // Insert `n` at position `i` of the output
                output.splice(i++, 0, n)
              }

              return ucs2encode(output)
            }

            /**
             * Converts a string of Unicode symbols (e.g. a domain name label) to a
             * Punycode string of ASCII-only symbols.
             * @memberOf punycode
             * @param {String} input The string of Unicode symbols.
             * @returns {String} The resulting Punycode string of ASCII-only symbols.
             */
            function encode(input) {
              var n,
                delta,
                handledCPCount,
                basicLength,
                bias,
                j,
                m,
                q,
                k,
                t,
                currentValue,
                output = [],
                /** `inputLength` will hold the number of code points in `input`. */
                inputLength,
                /** Cached calculation results */
                handledCPCountPlusOne,
                baseMinusT,
                qMinusT

              // Convert the input in UCS-2 to Unicode
              input = ucs2decode(input)

              // Cache the length
              inputLength = input.length

              // Initialize the state
              n = initialN
              delta = 0
              bias = initialBias

              // Handle the basic code points
              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j]
                if (currentValue < 0x80) {
                  output.push(stringFromCharCode(currentValue))
                }
              }

              handledCPCount = basicLength = output.length

              // `handledCPCount` is the number of code points that have been handled;
              // `basicLength` is the number of basic code points.

              // Finish the basic string - if it is not empty - with a delimiter
              if (basicLength) {
                output.push(delimiter)
              }

              // Main encoding loop:
              while (handledCPCount < inputLength) {
                // All non-basic code points < n have been handled already. Find the next
                // larger one:
                for (m = maxInt, j = 0; j < inputLength; ++j) {
                  currentValue = input[j]
                  if (currentValue >= n && currentValue < m) {
                    m = currentValue
                  }
                }

                // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                // but guard against overflow
                handledCPCountPlusOne = handledCPCount + 1
                if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                  error('overflow')
                }

                delta += (m - n) * handledCPCountPlusOne
                n = m

                for (j = 0; j < inputLength; ++j) {
                  currentValue = input[j]

                  if (currentValue < n && ++delta > maxInt) {
                    error('overflow')
                  }

                  if (currentValue == n) {
                    // Represent delta as a generalized variable-length integer
                    for (q = delta, k = base /* no condition */; ; k += base) {
                      t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias
                      if (q < t) {
                        break
                      }
                      qMinusT = q - t
                      baseMinusT = base - t
                      output.push(
                        stringFromCharCode(
                          digitToBasic(t + (qMinusT % baseMinusT), 0)
                        )
                      )
                      q = floor(qMinusT / baseMinusT)
                    }

                    output.push(stringFromCharCode(digitToBasic(q, 0)))
                    bias = adapt(
                      delta,
                      handledCPCountPlusOne,
                      handledCPCount == basicLength
                    )
                    delta = 0
                    ++handledCPCount
                  }
                }

                ++delta
                ++n
              }
              return output.join('')
            }

            /**
             * Converts a Punycode string representing a domain name or an email address
             * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
             * it doesn't matter if you call it on a string that has already been
             * converted to Unicode.
             * @memberOf punycode
             * @param {String} input The Punycoded domain name or email address to
             * convert to Unicode.
             * @returns {String} The Unicode representation of the given Punycode
             * string.
             */
            function toUnicode(input) {
              return mapDomain(input, function (string) {
                return regexPunycode.test(string)
                  ? decode(string.slice(4).toLowerCase())
                  : string
              })
            }

            /**
             * Converts a Unicode string representing a domain name or an email address to
             * Punycode. Only the non-ASCII parts of the domain name will be converted,
             * i.e. it doesn't matter if you call it with a domain that's already in
             * ASCII.
             * @memberOf punycode
             * @param {String} input The domain name or email address to convert, as a
             * Unicode string.
             * @returns {String} The Punycode representation of the given domain name or
             * email address.
             */
            function toASCII(input) {
              return mapDomain(input, function (string) {
                return regexNonASCII.test(string)
                  ? 'xn--' + encode(string)
                  : string
              })
            }

            /*--------------------------------------------------------------------------*/

            /** Define the public API */
            punycode = {
              /**
               * A string representing the current Punycode.js version number.
               * @memberOf punycode
               * @type String
               */
              version: '1.3.2',
              /**
               * An object of methods to convert from JavaScript's internal character
               * representation (UCS-2) to Unicode code points, and back.
               * @see <https://mathiasbynens.be/notes/javascript-encoding>
               * @memberOf punycode
               * @type Object
               */
              ucs2: {
                decode: ucs2decode,
                encode: ucs2encode,
              },
              decode: decode,
              encode: encode,
              toASCII: toASCII,
              toUnicode: toUnicode,
            }

            /** Expose `punycode` */
            // Some AMD build optimizers, like r.js, check for specific condition patterns
            // like the following:
            if (true) {
              !((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return punycode
              }.call(exports, __webpack_require__, exports, module)),
              __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
            } else {
            }
          })(this)

          /***/
        },

      /***/ './node_modules/url/url.js':
        /*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var punycode = __webpack_require__(
            /*! punycode */ './node_modules/url/node_modules/punycode/punycode.js'
          )
          var util = __webpack_require__(
            /*! ./util */ './node_modules/url/util.js'
          )

          exports.parse = urlParse
          exports.resolve = urlResolve
          exports.resolveObject = urlResolveObject
          exports.format = urlFormat

          exports.Url = Url

          function Url() {
            this.protocol = null
            this.slashes = null
            this.auth = null
            this.host = null
            this.port = null
            this.hostname = null
            this.hash = null
            this.search = null
            this.query = null
            this.pathname = null
            this.path = null
            this.href = null
          }

          // Reference: RFC 3986, RFC 1808, RFC 2396

          // define these here so at least they only have to be
          // compiled once on the first module load.
          var protocolPattern = /^([a-z0-9.+-]+:)/i,
            portPattern = /:[0-9]*$/,
            // Special case for a simple path URL
            simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            // RFC 2396: characters reserved for delimiting URLs.
            // We actually just auto-escape these.
            delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
            // RFC 2396: characters not allowed for various reasons.
            unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
            // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
            autoEscape = ["'"].concat(unwise),
            // Characters that are never ever allowed in a hostname.
            // Note that any invalid chars are also handled, but these
            // are the ones that are *expected* to be seen, so we fast-path
            // them.
            nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
            hostEndingChars = ['/', '?', '#'],
            hostnameMaxLen = 255,
            hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
            hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            // protocols that can allow "unsafe" and "unwise" chars.
            unsafeProtocol = {
              javascript: true,
              'javascript:': true,
            },
            // protocols that never have a hostname.
            hostlessProtocol = {
              javascript: true,
              'javascript:': true,
            },
            // protocols that always contain a // bit.
            slashedProtocol = {
              http: true,
              https: true,
              ftp: true,
              gopher: true,
              file: true,
              'http:': true,
              'https:': true,
              'ftp:': true,
              'gopher:': true,
              'file:': true,
            },
            querystring = __webpack_require__(
              /*! querystring */ './node_modules/querystring/index.js'
            )

          function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url

            var u = new Url()
            u.parse(url, parseQueryString, slashesDenoteHost)
            return u
          }

          Url.prototype.parse = function (
            url,
            parseQueryString,
            slashesDenoteHost
          ) {
            if (!util.isString(url)) {
              throw new TypeError(
                "Parameter 'url' must be a string, not " + typeof url
              )
            }

            // Copy chrome, IE, opera backslash-handling behavior.
            // Back slashes before the query string get converted to forward slashes
            // See: https://code.google.com/p/chromium/issues/detail?id=25916
            var queryIndex = url.indexOf('?'),
              splitter =
                queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
              uSplit = url.split(splitter),
              slashRegex = /\\/g
            uSplit[0] = uSplit[0].replace(slashRegex, '/')
            url = uSplit.join(splitter)

            var rest = url

            // trim before proceeding.
            // This is to support parse stuff like "  http://foo.com  \n"
            rest = rest.trim()

            if (!slashesDenoteHost && url.split('#').length === 1) {
              // Try fast path regexp
              var simplePath = simplePathPattern.exec(rest)
              if (simplePath) {
                this.path = rest
                this.href = rest
                this.pathname = simplePath[1]
                if (simplePath[2]) {
                  this.search = simplePath[2]
                  if (parseQueryString) {
                    this.query = querystring.parse(this.search.substr(1))
                  } else {
                    this.query = this.search.substr(1)
                  }
                } else if (parseQueryString) {
                  this.search = ''
                  this.query = {}
                }
                return this
              }
            }

            var proto = protocolPattern.exec(rest)
            if (proto) {
              proto = proto[0]
              var lowerProto = proto.toLowerCase()
              this.protocol = lowerProto
              rest = rest.substr(proto.length)
            }

            // figure out if it's got a host
            // user@server is *always* interpreted as a hostname, and url
            // resolution will treat //foo/bar as host=foo,path=bar because that's
            // how the browser resolves relative URLs.
            if (
              slashesDenoteHost ||
              proto ||
              rest.match(/^\/\/[^@\/]+@[^@\/]+/)
            ) {
              var slashes = rest.substr(0, 2) === '//'
              if (slashes && !(proto && hostlessProtocol[proto])) {
                rest = rest.substr(2)
                this.slashes = true
              }
            }

            if (
              !hostlessProtocol[proto] &&
              (slashes || (proto && !slashedProtocol[proto]))
            ) {
              // there's a hostname.
              // the first instance of /, ?, ;, or # ends the host.
              //
              // If there is an @ in the hostname, then non-host chars *are* allowed
              // to the left of the last @ sign, unless some host-ending character
              // comes *before* the @-sign.
              // URLs are obnoxious.
              //
              // ex:
              // http://a@b@c/ => user:a@b host:c
              // http://a@b?@c => user:a host:c path:/?@c

              // v0.12 TODO(isaacs): This is not quite how Chrome does things.
              // Review our test case against browsers more comprehensively.

              // find the first instance of any hostEndingChars
              var hostEnd = -1
              for (var i = 0; i < hostEndingChars.length; i++) {
                var hec = rest.indexOf(hostEndingChars[i])
                if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                  hostEnd = hec
              }

              // at this point, either we have an explicit point where the
              // auth portion cannot go past, or the last @ char is the decider.
              var auth, atSign
              if (hostEnd === -1) {
                // atSign can be anywhere.
                atSign = rest.lastIndexOf('@')
              } else {
                // atSign must be in auth portion.
                // http://a@b/c@d => host:b auth:a path:/c@d
                atSign = rest.lastIndexOf('@', hostEnd)
              }

              // Now we have a portion which is definitely the auth.
              // Pull that off.
              if (atSign !== -1) {
                auth = rest.slice(0, atSign)
                rest = rest.slice(atSign + 1)
                this.auth = decodeURIComponent(auth)
              }

              // the host is the remaining to the left of the first non-host char
              hostEnd = -1
              for (var i = 0; i < nonHostChars.length; i++) {
                var hec = rest.indexOf(nonHostChars[i])
                if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                  hostEnd = hec
              }
              // if we still have not hit it, then the entire thing is a host.
              if (hostEnd === -1) hostEnd = rest.length

              this.host = rest.slice(0, hostEnd)
              rest = rest.slice(hostEnd)

              // pull out port.
              this.parseHost()

              // we've indicated that there is a hostname,
              // so even if it's empty, it has to be present.
              this.hostname = this.hostname || ''

              // if hostname begins with [ and ends with ]
              // assume that it's an IPv6 address.
              var ipv6Hostname =
                this.hostname[0] === '[' &&
                this.hostname[this.hostname.length - 1] === ']'

              // validate a little.
              if (!ipv6Hostname) {
                var hostparts = this.hostname.split(/\./)
                for (var i = 0, l = hostparts.length; i < l; i++) {
                  var part = hostparts[i]
                  if (!part) continue
                  if (!part.match(hostnamePartPattern)) {
                    var newpart = ''
                    for (var j = 0, k = part.length; j < k; j++) {
                      if (part.charCodeAt(j) > 127) {
                        // we replace non-ASCII char with a temporary placeholder
                        // we need this to make sure size of hostname is not
                        // broken by replacing non-ASCII by nothing
                        newpart += 'x'
                      } else {
                        newpart += part[j]
                      }
                    }
                    // we test again with ASCII char only
                    if (!newpart.match(hostnamePartPattern)) {
                      var validParts = hostparts.slice(0, i)
                      var notHost = hostparts.slice(i + 1)
                      var bit = part.match(hostnamePartStart)
                      if (bit) {
                        validParts.push(bit[1])
                        notHost.unshift(bit[2])
                      }
                      if (notHost.length) {
                        rest = '/' + notHost.join('.') + rest
                      }
                      this.hostname = validParts.join('.')
                      break
                    }
                  }
                }
              }

              if (this.hostname.length > hostnameMaxLen) {
                this.hostname = ''
              } else {
                // hostnames are always lower case.
                this.hostname = this.hostname.toLowerCase()
              }

              if (!ipv6Hostname) {
                // IDNA Support: Returns a punycoded representation of "domain".
                // It only converts parts of the domain name that
                // have non-ASCII characters, i.e. it doesn't matter if
                // you call it with a domain that already is ASCII-only.
                this.hostname = punycode.toASCII(this.hostname)
              }

              var p = this.port ? ':' + this.port : ''
              var h = this.hostname || ''
              this.host = h + p
              this.href += this.host

              // strip [ and ] from the hostname
              // the host field still retains them, though
              if (ipv6Hostname) {
                this.hostname = this.hostname.substr(
                  1,
                  this.hostname.length - 2
                )
                if (rest[0] !== '/') {
                  rest = '/' + rest
                }
              }
            }

            // now rest is set to the post-host stuff.
            // chop off any delim chars.
            if (!unsafeProtocol[lowerProto]) {
              // First, make 100% sure that any "autoEscape" chars get
              // escaped, even if encodeURIComponent doesn't think they
              // need to be.
              for (var i = 0, l = autoEscape.length; i < l; i++) {
                var ae = autoEscape[i]
                if (rest.indexOf(ae) === -1) continue
                var esc = encodeURIComponent(ae)
                if (esc === ae) {
                  esc = escape(ae)
                }
                rest = rest.split(ae).join(esc)
              }
            }

            // chop off from the tail first.
            var hash = rest.indexOf('#')
            if (hash !== -1) {
              // got a fragment string.
              this.hash = rest.substr(hash)
              rest = rest.slice(0, hash)
            }
            var qm = rest.indexOf('?')
            if (qm !== -1) {
              this.search = rest.substr(qm)
              this.query = rest.substr(qm + 1)
              if (parseQueryString) {
                this.query = querystring.parse(this.query)
              }
              rest = rest.slice(0, qm)
            } else if (parseQueryString) {
              // no query string, but parseQueryString still requested
              this.search = ''
              this.query = {}
            }
            if (rest) this.pathname = rest
            if (
              slashedProtocol[lowerProto] &&
              this.hostname &&
              !this.pathname
            ) {
              this.pathname = '/'
            }

            //to support http.request
            if (this.pathname || this.search) {
              var p = this.pathname || ''
              var s = this.search || ''
              this.path = p + s
            }

            // finally, reconstruct the href based on what has been validated.
            this.href = this.format()
            return this
          }

          // format a parsed object into a url string
          function urlFormat(obj) {
            // ensure it's an object, and not a string url.
            // If it's an obj, this is a no-op.
            // this way, you can call url_format() on strings
            // to clean up potentially wonky urls.
            if (util.isString(obj)) obj = urlParse(obj)
            if (!(obj instanceof Url)) return Url.prototype.format.call(obj)
            return obj.format()
          }

          Url.prototype.format = function () {
            var auth = this.auth || ''
            if (auth) {
              auth = encodeURIComponent(auth)
              auth = auth.replace(/%3A/i, ':')
              auth += '@'
            }

            var protocol = this.protocol || '',
              pathname = this.pathname || '',
              hash = this.hash || '',
              host = false,
              query = ''

            if (this.host) {
              host = auth + this.host
            } else if (this.hostname) {
              host =
                auth +
                (this.hostname.indexOf(':') === -1
                  ? this.hostname
                  : '[' + this.hostname + ']')
              if (this.port) {
                host += ':' + this.port
              }
            }

            if (
              this.query &&
              util.isObject(this.query) &&
              Object.keys(this.query).length
            ) {
              query = querystring.stringify(this.query)
            }

            var search = this.search || (query && '?' + query) || ''

            if (protocol && protocol.substr(-1) !== ':') protocol += ':'

            // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
            // unless they had them to begin with.
            if (
              this.slashes ||
              ((!protocol || slashedProtocol[protocol]) && host !== false)
            ) {
              host = '//' + (host || '')
              if (pathname && pathname.charAt(0) !== '/')
                pathname = '/' + pathname
            } else if (!host) {
              host = ''
            }

            if (hash && hash.charAt(0) !== '#') hash = '#' + hash
            if (search && search.charAt(0) !== '?') search = '?' + search

            pathname = pathname.replace(/[?#]/g, function (match) {
              return encodeURIComponent(match)
            })
            search = search.replace('#', '%23')

            return protocol + host + pathname + search + hash
          }

          function urlResolve(source, relative) {
            return urlParse(source, false, true).resolve(relative)
          }

          Url.prototype.resolve = function (relative) {
            return this.resolveObject(urlParse(relative, false, true)).format()
          }

          function urlResolveObject(source, relative) {
            if (!source) return relative
            return urlParse(source, false, true).resolveObject(relative)
          }

          Url.prototype.resolveObject = function (relative) {
            if (util.isString(relative)) {
              var rel = new Url()
              rel.parse(relative, false, true)
              relative = rel
            }

            var result = new Url()
            var tkeys = Object.keys(this)
            for (var tk = 0; tk < tkeys.length; tk++) {
              var tkey = tkeys[tk]
              result[tkey] = this[tkey]
            }

            // hash is always overridden, no matter what.
            // even href="" will remove it.
            result.hash = relative.hash

            // if the relative url is empty, then there's nothing left to do here.
            if (relative.href === '') {
              result.href = result.format()
              return result
            }

            // hrefs like //foo/bar always cut to the protocol.
            if (relative.slashes && !relative.protocol) {
              // take everything except the protocol from relative
              var rkeys = Object.keys(relative)
              for (var rk = 0; rk < rkeys.length; rk++) {
                var rkey = rkeys[rk]
                if (rkey !== 'protocol') result[rkey] = relative[rkey]
              }

              //urlParse appends trailing / to urls like http://www.example.com
              if (
                slashedProtocol[result.protocol] &&
                result.hostname &&
                !result.pathname
              ) {
                result.path = result.pathname = '/'
              }

              result.href = result.format()
              return result
            }

            if (relative.protocol && relative.protocol !== result.protocol) {
              // if it's a known url protocol, then changing
              // the protocol does weird things
              // first, if it's not file:, then we MUST have a host,
              // and if there was a path
              // to begin with, then we MUST have a path.
              // if it is file:, then the host is dropped,
              // because that's known to be hostless.
              // anything else is assumed to be absolute.
              if (!slashedProtocol[relative.protocol]) {
                var keys = Object.keys(relative)
                for (var v = 0; v < keys.length; v++) {
                  var k = keys[v]
                  result[k] = relative[k]
                }
                result.href = result.format()
                return result
              }

              result.protocol = relative.protocol
              if (!relative.host && !hostlessProtocol[relative.protocol]) {
                var relPath = (relative.pathname || '').split('/')
                while (relPath.length && !(relative.host = relPath.shift()));
                if (!relative.host) relative.host = ''
                if (!relative.hostname) relative.hostname = ''
                if (relPath[0] !== '') relPath.unshift('')
                if (relPath.length < 2) relPath.unshift('')
                result.pathname = relPath.join('/')
              } else {
                result.pathname = relative.pathname
              }
              result.search = relative.search
              result.query = relative.query
              result.host = relative.host || ''
              result.auth = relative.auth
              result.hostname = relative.hostname || relative.host
              result.port = relative.port
              // to support http.request
              if (result.pathname || result.search) {
                var p = result.pathname || ''
                var s = result.search || ''
                result.path = p + s
              }
              result.slashes = result.slashes || relative.slashes
              result.href = result.format()
              return result
            }

            var isSourceAbs =
                result.pathname && result.pathname.charAt(0) === '/',
              isRelAbs =
                relative.host ||
                (relative.pathname && relative.pathname.charAt(0) === '/'),
              mustEndAbs =
                isRelAbs || isSourceAbs || (result.host && relative.pathname),
              removeAllDots = mustEndAbs,
              srcPath = (result.pathname && result.pathname.split('/')) || [],
              relPath =
                (relative.pathname && relative.pathname.split('/')) || [],
              psychotic = result.protocol && !slashedProtocol[result.protocol]

            // if the url is a non-slashed url, then relative
            // links like ../.. should be able
            // to crawl up to the hostname, as well.  This is strange.
            // result.protocol has already been set by now.
            // Later on, put the first path part into the host field.
            if (psychotic) {
              result.hostname = ''
              result.port = null
              if (result.host) {
                if (srcPath[0] === '') srcPath[0] = result.host
                else srcPath.unshift(result.host)
              }
              result.host = ''
              if (relative.protocol) {
                relative.hostname = null
                relative.port = null
                if (relative.host) {
                  if (relPath[0] === '') relPath[0] = relative.host
                  else relPath.unshift(relative.host)
                }
                relative.host = null
              }
              mustEndAbs =
                mustEndAbs && (relPath[0] === '' || srcPath[0] === '')
            }

            if (isRelAbs) {
              // it's absolute.
              result.host =
                relative.host || relative.host === ''
                  ? relative.host
                  : result.host
              result.hostname =
                relative.hostname || relative.hostname === ''
                  ? relative.hostname
                  : result.hostname
              result.search = relative.search
              result.query = relative.query
              srcPath = relPath
              // fall through to the dot-handling below.
            } else if (relPath.length) {
              // it's relative
              // throw away the existing file, and take the new path instead.
              if (!srcPath) srcPath = []
              srcPath.pop()
              srcPath = srcPath.concat(relPath)
              result.search = relative.search
              result.query = relative.query
            } else if (!util.isNullOrUndefined(relative.search)) {
              // just pull out the search.
              // like href='?foo'.
              // Put this after the other two cases because it simplifies the booleans
              if (psychotic) {
                result.hostname = result.host = srcPath.shift()
                //occationaly the auth can get stuck only in host
                //this especially happens in cases like
                //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                var authInHost =
                  result.host && result.host.indexOf('@') > 0
                    ? result.host.split('@')
                    : false
                if (authInHost) {
                  result.auth = authInHost.shift()
                  result.host = result.hostname = authInHost.shift()
                }
              }
              result.search = relative.search
              result.query = relative.query
              //to support http.request
              if (
                !util.isNull(result.pathname) ||
                !util.isNull(result.search)
              ) {
                result.path =
                  (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '')
              }
              result.href = result.format()
              return result
            }

            if (!srcPath.length) {
              // no path at all.  easy.
              // we've already handled the other stuff above.
              result.pathname = null
              //to support http.request
              if (result.search) {
                result.path = '/' + result.search
              } else {
                result.path = null
              }
              result.href = result.format()
              return result
            }

            // if a url ENDs in . or .., then it must get a trailing slash.
            // however, if it ends in anything else non-slashy,
            // then it must NOT get a trailing slash.
            var last = srcPath.slice(-1)[0]
            var hasTrailingSlash =
              ((result.host || relative.host || srcPath.length > 1) &&
                (last === '.' || last === '..')) ||
              last === ''

            // strip single dots, resolve double dots to parent dir
            // if the path tries to go above the root, `up` ends up > 0
            var up = 0
            for (var i = srcPath.length; i >= 0; i--) {
              last = srcPath[i]
              if (last === '.') {
                srcPath.splice(i, 1)
              } else if (last === '..') {
                srcPath.splice(i, 1)
                up++
              } else if (up) {
                srcPath.splice(i, 1)
                up--
              }
            }

            // if the path is allowed to go above the root, restore leading ..s
            if (!mustEndAbs && !removeAllDots) {
              for (; up--; up) {
                srcPath.unshift('..')
              }
            }

            if (
              mustEndAbs &&
              srcPath[0] !== '' &&
              (!srcPath[0] || srcPath[0].charAt(0) !== '/')
            ) {
              srcPath.unshift('')
            }

            if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
              srcPath.push('')
            }

            var isAbsolute =
              srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/')

            // put the host back
            if (psychotic) {
              result.hostname = result.host = isAbsolute
                ? ''
                : srcPath.length
                ? srcPath.shift()
                : ''
              //occationaly the auth can get stuck only in host
              //this especially happens in cases like
              //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
              var authInHost =
                result.host && result.host.indexOf('@') > 0
                  ? result.host.split('@')
                  : false
              if (authInHost) {
                result.auth = authInHost.shift()
                result.host = result.hostname = authInHost.shift()
              }
            }

            mustEndAbs = mustEndAbs || (result.host && srcPath.length)

            if (mustEndAbs && !isAbsolute) {
              srcPath.unshift('')
            }

            if (!srcPath.length) {
              result.pathname = null
              result.path = null
            } else {
              result.pathname = srcPath.join('/')
            }

            //to support request.http
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
              result.path =
                (result.pathname ? result.pathname : '') +
                (result.search ? result.search : '')
            }
            result.auth = relative.auth || result.auth
            result.slashes = result.slashes || relative.slashes
            result.href = result.format()
            return result
          }

          Url.prototype.parseHost = function () {
            var host = this.host
            var port = portPattern.exec(host)
            if (port) {
              port = port[0]
              if (port !== ':') {
                this.port = port.substr(1)
              }
              host = host.substr(0, host.length - port.length)
            }
            if (host) this.hostname = host
          }

          /***/
        },

      /***/ './node_modules/url/util.js':
        /*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
        /***/ (module) => {
          'use strict'

          module.exports = {
            isString: function (arg) {
              return typeof arg === 'string'
            },
            isObject: function (arg) {
              return typeof arg === 'object' && arg !== null
            },
            isNull: function (arg) {
              return arg === null
            },
            isNullOrUndefined: function (arg) {
              return arg == null
            },
          }

          /***/
        },

      /******/
    }
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {}
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId]
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ id: moduleId,
        /******/ loaded: false,
        /******/ exports: {},
        /******/
      })
      /******/
      /******/ // Execute the module function
      /******/ __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      )
      /******/
      /******/ // Flag the module as loaded
      /******/ module.loaded = true
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ ;(() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            })
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    })()
    /******/
    /******/ /* webpack/runtime/global */
    /******/ ;(() => {
      /******/ __webpack_require__.g = (function () {
        /******/ if (typeof globalThis === 'object') return globalThis
        /******/ try {
          /******/ return this || new Function('return this')()
          /******/
        } catch (e) {
          /******/ if (typeof window === 'object') return window
          /******/
        }
        /******/
      })()
      /******/
    })()
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ ;(() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop)
      /******/
    })()
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ ;(() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          })
          /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true })
        /******/
      }
      /******/
    })()
    /******/
    /******/ /* webpack/runtime/node module decorator */
    /******/ ;(() => {
      /******/ __webpack_require__.nmd = (module) => {
        /******/ module.paths = []
        /******/ if (!module.children) module.children = []
        /******/ return module
        /******/
      }
      /******/
    })()
    /******/
    /************************************************************************/
    var __webpack_exports__ = {}
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    ;(() => {
      'use strict'
      var exports = __webpack_exports__
      /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

      Object.defineProperty(exports, '__esModule', { value: true })
      exports.ImgurClient = void 0
      const client_1 = __webpack_require__(/*! ./client */ './src/client.ts')
      var client_2 = __webpack_require__(/*! ./client */ './src/client.ts')
      Object.defineProperty(exports, 'ImgurClient', {
        enumerable: true,
        get: function () {
          return client_2.ImgurClient
        },
      })
      exports.default = client_1.ImgurClient
    })()

    __webpack_exports__ = __webpack_exports__.default
    /******/ return __webpack_exports__
    /******/
  })()
})
//# sourceMappingURL=imgur.js.map
