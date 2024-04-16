const model = tf.sequential()
let trained = false

async function learnLinear () {

    model.add(tf.layers.dense({units: 1, inputShape: [1]}))

    model.compile({
        loss: "meanSquaredError",
        optimizer: "sgd"
    })

    const xs = tf.tensor2d([-6, -5, -4, -3, -2, -1, 0, 1, 2], [9, 1])
    const ys = tf.tensor2d([-6, -4, -2, 0, 2, 4, 6, 8, 10], [9, 1])

    await model.fit(xs, ys, { epochs: 250 })
    trained = true
    document.getElementById("description").innerText = "Modelo Entrenado Correctamente"
}

async function predict (num) {
    if (trained) {
        document.getElementById("output_field").innerHTML = 
            `<p class='text-white'>Resultado de x=${num} es: ${model.predict(tf.tensor2d([num], [1, 1])).dataSync()[0]}</p>`
    } else {
        alert("Modelo no Entrenado, entrenalo primero para poder predecir")
    }
}

const numberPredict = document.getElementById("numberPredict")
document.getElementById("resultado").addEventListener("click", learnLinear)
document.getElementById("predict").addEventListener("click", () => predict(parseInt(numberPredict.value)))