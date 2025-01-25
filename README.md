# js-helpers

A collection of JavaScript helper functions to streamline development tasks.

## Available Functions

### Async
- [iterateAsyncOperations](./lib/async/iterateAsyncOperations.js)
- [PromiseManager](./lib/async/PromiseManager.js)

### Date
- [formatDateForSpreadsheet](./lib/date/formatDateForSpreadsheet.js)
- [generateHumanReadableNowDatetimeString](./lib/date/generateHumanReadableNowDatetimeString.js)
- [getUTCDateString](./lib/date/getUTCDateString.js)

### File System (FS)
- [checkIsDirExist](./lib/fs/checkIsDirExist.js)
- [checkIsFileExist](./lib/fs/checkIsFileExist.js)
- [createDir](./lib/fs/createDir.js)
- [createDirIfNotExist](./lib/fs/createDirIfNotExist.js)
- [fsLogger](./lib/fs/fsLogger.js)
- [generateFileFullPathWithTimePrefix](./lib/fs/generateFileFullPathWithTimePrefix.js)
- [generateTempFileFullPath](./lib/fs/generateTempFileFullPath.js)
- [getFullPath](./lib/fs/getFullPath.js)
- [readCsvFile](./lib/fs/readCsvFile.js)
- [readEnvFile](./lib/fs/readEnvFile.js)
- [readJsonFile](./lib/fs/readJsonFile.js)
- [readTextFile](./lib/fs/readTextFile.js)
- [saveCsvFile](./lib/fs/saveCsvFile.js)
- [saveJsonFile](./lib/fs/saveJsonFile.js)
- [saveTextFile](./lib/fs/saveTextFile.js)

### Global Error Handler
- [globalErrorHandler](./lib/globalErrorHandler.js)

### Logger
- [logger defaultOptions](./lib/logger/defaultOptions.js)
- [createLogger](./lib/logger/createLogger.js)

### Network
- [makeJsonRequest](./lib/network/makeJsonRequest.js)
- [makeRequest](./lib/network/makeRequest.js)
- [parseBodyToJson](./lib/network/parseBodyToJson.js)

### Object
- [jsonDeepClone](./lib/object/jsonDeepClone.js)

### String
- [generateCsvString](./lib/string/generateCsvString.js)
- [generateRandomNumberString](./lib/string/generateRandomNumberString.js)
- [removeSubstrings](./lib/string/removeSubstrings.js)
- [validateId](./lib/string/validateId.js)

### Terminal
- [askQuestionInTerminal](./lib/terminal/askQuestionInTerminal.js)

