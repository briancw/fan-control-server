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

    if (temperature > 60) {
        setFanSpeed(100)
    }
    else if (temperature > 50) {
        setFanSpeed(75)
    }
    else if (temperature > 40) {
        setFanSpeed(50)
    }
    else {
        setFanSpeed(30)
    }

    response.end()
})
.get('/', (request, response) => {
    response.end(`Current temperature: ${currentTemperature}°C`)
})
.listen(port, (error) => {
    console.log(`Listening on port ${port}`)
    if (error) {
        console.error(error)
    }
})
