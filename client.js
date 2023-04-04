import {execSync} from 'node:child_process'
import http from 'node:http'

const getTemperature = () => {
    const temperature = execSync('nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader').toString().trim()
    const usage = Number.parseInt(execSync('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader').toString(), 10)

    const options = {
        hostname: '10.0.0.36',
        port: 3000,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const request = http.request(options)
    request.on('error', (error) => {
        console.error('Error connecting to host')
    })
    const data = JSON.stringify({temperature, usage})
    request.write(data)
    request.end()
}

setInterval(getTemperature, 1000)
