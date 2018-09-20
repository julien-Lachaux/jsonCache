import fs           from 'fs'
import moment       from 'moment'

/**
 * json cache system
 */
export const jsonCache = {
        /**
         * path: path of the cache directory
         * dateFormat: format of the date for the name of cache file
         * maxCacheSize: max files into each type of cache
         */
        path: `data/`,
        dateFormat: 'DD-MM-YY--HH:mm:ss',
        maxCacheSize: 5, // max nbr of json files

        /**
         * write
         * cache an array or a javascript object into a json files
         * @param {Array|Object} data 
         * @param {string} dataType 
         */
        async write(data, dataType) {
            var dir = `${this.path}/${dataType}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            let cacheDate = moment().format(this.dateFormat)
            let cachePath = `${dir}/${dataType}_${cacheDate}.json`
            await fs.writeFile(cachePath, JSON.stringify(data), async (err) => {
                if (err) throw err
                console.log(`Write cache at ${this.path}${dataType}/${dataType}_${cacheDate}.json with ${data.length} entries -- ${cacheDate}) \r`)
                
                await this.clean(dataType)
            })
        },
        
        /**
         * clean
         * remove files under the max files limit
         * @param {string} dataType type of cache to clean
         */
        async clean(dataType) {
            const dataTypePath = `${this.path}${dataType}`
            var success = true
            console.log(`cleaning cache of ${dataType} ! \r`)

            let files = fs.readdirSync(dataTypePath)

            if (files.length > 5) {
                var nbrOfFileToClean = files.length - 5
                
                console.log(`cleaning needed for ${nbrOfFileToClean} files ! \r`)
                console.log(`cleaning started... \r`)
                
                for (let i = 0; i < nbrOfFileToClean; i++) {
                    let olderFile = await this.getOldestFile(dataType)
                    
                    let olderFilePath = `${dataTypePath}/${olderFile}`
                    fs.unlinkSync(olderFilePath)

                    if (fs.existsSync(olderFilePath)) {
                        console.log(`cleaning failed to delete this file: ${olderFilePath} \r`)
                        console.log(`cleaning abort, number of files remaining to clean: ${(nbrOfFileToClean - i)} \r`)
                        success = false
                    } else {
                        console.log(`cleaning this file with succes: ${olderFilePath}, ${(nbrOfFileToClean - (i + 1))} files remaining \r`)
                    }
                }
            }

            if (success) { console.log('cleaning finish with success \r') }
        },

        /**
         * getOldestFile
         * return the oldest cached files from the dataType specified
         * @param {string} dataType 
         */
        async getOldestFile(dataType) {
            const dataTypePath = `${this.path}${dataType}`
            var files = fs.readdirSync(dataTypePath)
            var oldestFile = undefined


            files.forEach(file => {
                if (oldestFile !== undefined) {
                    let date = moment(file.substring((file.indexOf('_') + 1), file.indexOf('.')), this.dateFormat)
                    let oldestFileDate = moment(oldestFile.substring((oldestFile.indexOf('_') + 1), oldestFile.indexOf('.')), this.dateFormat)

                    if (date.isBefore(oldestFileDate)) { oldestFile = file }
                } else {
                    oldestFile = file
                }
            })

            return oldestFile
        },

        /**
         * getMostRecentFile
         * return the most recent cached files from the dataType specified
         * @param {string} dataType 
         */
        async getMostRecentFile(dataType) {
            const dataTypePath = `${this.path}${dataType}`
            var mostRecentFile = undefined
            var files = fs.readdirSync(dataTypePath)

            files.forEach(file => {
                if (mostRecentFile !== undefined) {
                    let date = moment(file.substring((file.indexOf('_') + 1), file.indexOf('.')), this.dateFormat)
                    let mostRecentFileDate = moment(mostRecentFile.substring((mostRecentFile.indexOf('_') + 1), mostRecentFile.indexOf('.')), this.dateFormat)

                    if (date.isAfter(mostRecentFileDate)) { mostRecentFile = file }
                } else {
                    mostRecentFile = file
                }
            })

            return mostRecentFile
        }
    }