import polka from 'polka'
import bodyParser from 'body-parser'
import {exec} from 'node:child_process'

const port = 3000
let currentSpeed = 0
let currentTemperature = 0

const setFanSpeed = (speed) => {
    const hexValue = `0x${speed.toString(16)}`
    if (currentSpeed !== speed) {
        exec(`ipmitool raw 0x3a 0x01 0x00 ${hexValue} 0x00 0x00 0x00 0x00 0x00 0x00`)
        console.log('Setting fan speed to', speed)
        currentSpeed = speed
    }
}

polka()
.use(bodyParser.json())
.post('/', (request, response) => {
    const {temperature} = request.body
    currentTemperature = temperature

    // Use a sigmoid function to calculate fan speed
    const fanSpeed = Math.round(100 / (1 + Math.exp(-0.1 * (temperature - 45))))
    setFanSpeed(fanSpeed)
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
