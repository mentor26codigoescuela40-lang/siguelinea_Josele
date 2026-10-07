/**
 * Extensión personalizada para seguimiento de línea con Maqueen Plus
 */
//% color="#0fbc11" weight=90 icon="\uf1b9" block="Mi Siguelíneas"
namespace miSiguelineas {

    let ejecutando = false;

    /**
     * Inicia el algoritmo personalizado de seguimiento de línea.
     * @param velocidad Velocidad de movimiento del robot, eg: 50
     */
    //% block="iniciar siguelíneas personalizado a velocidad %velocidad"
    //% velocidad.defl=50
    //% velocidad.min=10 velocidad.max=255
    export function iniciar(velocidad: number): void {
        ejecutando = true;

        control.inBackground(function () {
            while (ejecutando) {
                pasoAlgoritmo(velocidad);
                basic.pause(10); // Pausa mínima para no saturar el bus I2C
            }
        });
    }

    /**
     * Detiene el seguimiento de línea y frena los motores.
     */
    //% block="detener siguelíneas personalizado"
    export function detener(): void {
        ejecutando = false;
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 0);
    }

    /**
     * Lógica interna de lectura de sensores y control de motores
     */
    function pasoAlgoritmo(v: number): void {
        if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, v);
        } else if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1) == 1) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, v);
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, v);
        } else if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1) == 1) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, v);
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, v);
        } else {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 20);
        }
    }
}