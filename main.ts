input.onButtonPressed(Button.A, function () {
    miSiguelineas.iniciar(50)
})
input.onButtonPressed(Button.B, function () {
    miSiguelineas.detener()
})
maqueenPlusV2.I2CInit()
basic.showIcon(IconNames.House)
