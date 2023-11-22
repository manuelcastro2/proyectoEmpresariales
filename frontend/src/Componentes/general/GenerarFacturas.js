import { jsPDF } from 'jspdf'

export function GenerarPdf(factura) {
    console.log(factura);
    const doc = new jsPDF()
    doc.text(`${factura.tipofactura}`, 95, 20)
    doc.text(`Numero Factura: ${factura.nroFactura}`, 10, 30)
    doc.text(`Fecha: ${factura.fecha}`, 10, 40)
    doc.text(`Cliente: ${factura.nombreCliente}`, 10, 50)
    doc.text(`Documento: ${factura.documento}`, 10, 60)
    doc.text(`bodega: ${factura.bodegaNombre}`, 10, 70)
    doc.text(`direccion: ${factura.direccionBodega}`, 10, 80)
    doc.text(`Elementos`, 10, 90)
    let aumento = 10
    let bajar = 100
    factura.elementos.forEach((item) => {
        doc.text(`${item.nombre}`, aumento, bajar)
        aumento = aumento + 60
        doc.text(`${item.unidadMedida}`, aumento, bajar)
        aumento = aumento + 25
        doc.text(`${item.cantidad}`, aumento, bajar)
        aumento = aumento + 10
        doc.text(`${item.valorUnitario}`, aumento, bajar)
        aumento = aumento + 20
        doc.text(`${item.porcentaje}`, aumento, bajar)
        aumento = aumento + 20
        doc.text(`${item.cantidad * (item.valorUnitario + (item.valorUnitario * item.porcentaje))}`, aumento, bajar)
        aumento = 10
        bajar = bajar + 10
    })
    doc.text(`Valor total: ${factura.valor}`, 10, 150)

    doc.save(`factura_${factura.nroFactura}.pdf`)
}

export function GenerarInforme(informe) {
    const doc = new jsPDF()
    doc.text('INFORME', 95, 10)
    doc.text("Venta", 10, 20)
    doc.text("Costo de venta", 30, 20)
    doc.text("Margen de utilidad", 70, 20)
    doc.text("Porcentaje", 120, 20)
    doc.text("fecha", 150, 20)
    let aumento = 10
    let bajar = 30
    informe.forEach((item) => {
        doc.text(`${item.valorVenta}`, aumento, bajar)
        aumento = aumento + 20
        doc.text(`${item.valorCompra}`, aumento, bajar)
        aumento = aumento + 40
        doc.text(`${item.margen}`, aumento, bajar)
        aumento = aumento + 30
        doc.text(`${item.porcentaje}`, aumento, bajar)
        aumento = aumento + 20
        doc.text(`${item.fechaIncial}`, aumento, bajar)
        aumento = aumento + 30
        doc.text(`${item.fechaFinal}`, aumento, bajar)
        aumento = 20
        bajar = bajar + 10
    })
    informe.forEach((item, indice) => {
        if (indice === 0) {
            return doc.save(`informe_${item.fechaIncial}_${item.fechaFinal}.pdf`)
        }
    })

}