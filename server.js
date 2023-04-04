import polka from 'polka'
import bodyParser from 'body-parser'
import {exec} from 'node:child_process'

const port = 3000
let lastSpeed = 0
let currentTemperature = 0

const setFanSpeed = (speed) => {
    if (speed !== lastSpeed) {
        const hexValue = `0x${speed.toString(16).padStart(2, '0')}`
        exec(`ipmitool raw 0x3a 0x01 0x00 ${hexValue} 0x00 0x00 0x00 0x00 0x00 0x00`)
        lastSpeed = speed
    }
}

polka()
.use(bodyParser.json())
.post('/', (request, response) => {
    const {temperature, usage} = request.body
    currentTemperature = temperature

    if (usage > 0) {
        setFanSpeed(100)
    }
    else if (temperature < 50) {
        setFanSpeed(5)
    }

    response.end()
})
.get('/', (request, response) => {
    response.end(`Current temperature: ${currentTemperature}C`)
})
.listen(port, (error) => {
    console.log(`Listening on port ${port}`)
    if (error) {
        console.error(error)
    }
})
