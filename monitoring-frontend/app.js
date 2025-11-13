const cpuDiv = document.getElementById('cpu');
const latencyDiv = document.getElementById('latency');
const requestsDiv = document.getElementById('requests');
const ctx = document.getElementById('metricsChart').getContext('2d');

let labels = [];
let cpuData = [];
let latencyData = [];
let requestCountData = [];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'CPU Usage',
                backgroundColor: 'rgba(136, 132, 216, 0.4)',
                borderColor: '#8884d8',
                data: cpuData,
                fill: false
            },
            {
                label: 'Latency (ms)',
                backgroundColor: 'rgba(200, 150, 150, 0.2)',
                borderColor: '#ff6961',
                data: latencyData,
                fill: false
            },
            {
                label: 'Request Count',
                backgroundColor: 'rgba(150, 200, 150, 0.2)',
                borderColor: '#77dd77',
                data: requestCountData,
                fill: false
            }
        ]
    },
    options: {
        responsive: false,
        scales: {
            x: { display: true },
            y: { display: true }
        }
    }
});

function updateDashboard(metrics) {
    const now = new Date().toLocaleTimeString();
    cpuDiv.textContent = `CPU Usage: ${metrics.cpu_usage.toFixed(2)} %`;
    latencyDiv.textContent = `Latency: ${metrics.latency_ms} ms`;
    requestsDiv.textContent = `Requests: ${metrics.request_count}`;

    labels.push(now);
    cpuData.push(metrics.cpu_usage);
    latencyData.push(metrics.latency_ms);
    requestCountData.push(metrics.request_count);

    chart.update();
}

function pollMetrics() {
    fetch('http://localhost:8082/metrics')
        .then(res => res.json())
        .then(data => {
            updateDashboard(data);
        });
}

pollMetrics();
setInterval(pollMetrics, 10000);
