import jspdf from "jspdf"
import autoTable from 'jspdf-autotable'
import { formatDate } from './formatDate.js'

export const exportPDF = (data, option) => {
    const doc = new jspdf({
	orientation: 'p',
	unit: 'mm',
	format: 'letter'
    })

    const ulist = [ ]
    let i = 1
    let view = 'Total'
    let la = ''
    let y = 18
    
    switch(option){
	case 't':
	    const all = data.map(d =>{
		ulist.push([i, d.user, d.fullname, formatDate(d.createdAt), formatDate(d.updatedAt), `${d.enabled === true ? 'Activo' : 'Inactivo'}`],)
	        i += 1
	    })
    	    break
	case 'a':
	    const active = data.filter(e => e.enabled === true)
	    const act = active.map(e =>{
		ulist.push([i, e.user, e.fullname, formatDate(e.createdAt), formatDate(e.updatedAt),  'Activo'],)
	        i += 1
	    })
	    view = 'Activos'
	    break
	case 'i':
	    const inaactive = data.filter(e => e.enabled === false)
	    const inact = inaactive.map(e =>{
		ulist.push([i, e.user, e.fullname, formatDate(e.createdAt), formatDate(e.updatedAt),  'Inactivo'],)
	        i += 1
	    })
	    view = 'Inactivos'
	    break
	default:
    }

    let b = ulist
    for(let x=0; x<=1; x++){
	for(let i=0; i<=Object.keys(ulist).length - 1; i++){
	    b = [...b, ulist[i]]   
	}
    }

    doc.setFont('helvetica','bold')
    doc.setFontSize(12)
    doc.setLineDashPattern([1,1])
    doc.text("Listado de usuarios del proxy:", 14, y)
    doc.setFont('helvetica','normal')
    doc.text(view, 77, y)
    doc.setFont('helvetica','bold')
    doc.text('F/H:', 142, y)
    doc.setFont('helvetica','normal')
    doc.text(formatDate(Date.now()), 152, y)
    y += 3
    doc.line(14,y,200,y,'FD')

	y += 1
    doc.autoTable({
        theme: 'plain',
        margin: {top: y},
        styles: {
    	    font: 'helvetica'
    	    },
    	headStyles: { 3: { halign: 'center'}},
    	columnStyles: { 3: { halign: 'left', fillColor: [255, 255, 255] }},
		head: [['No.','Usuario','Nombre y apellidos','Creado','Modificado','Estado',]],
		body: ulist,
    })

    la = Math.ceil(doc.lastAutoTable.finalY)
    doc.line(16,`${la}`,200, la,'FD')
    y = la + 7
    doc.setFontSize(10)
//    doc.text('Aquí va un texto',16,y)
    y += 4.5
//    doc.text('JavaScript .Reduce() is an amazing feature we can solve most complex logic with its accumulator concept I strongly recommend to read my this 3 mints article . In which I show how we can use .reduce() to solve complex logic in short code',16,y,{align:"justify", maxWidth: 90})
    y+=5

    doc.save(`usuarios_${view}.pdf`)

}

export default exportPDF

/* NOTES:

	* Varios
	- Dimensiones de Hoja Carta: 215,9 x 279,4 mm (centroX: 108, centroY: 140)

    * Table
    - Styling options:
    
    theme: 'striped'|'grid'|'plain' = 'striped'
    styles: StyleDef
    headStyles: StyleDef
    bodyStyles: StyleDef
    footStyles: StyleDef
    alternateRowStyles: StyleDef
    columnStyles: {&columnDataKey: StyleDef} Note that the columnDataKey is normally the index of the column, but could also be the dataKey of a column if content initialized with the columns property

    - StyleDef:
    
    font: 'helvetica'|'times'|'courier' = 'helvetica'
    fontStyle: 'normal'|'bold'|'italic'|'bolditalic' = 'normal'
    overflow: 'linebreak'|'ellipsize'|'visible'|'hidden' = 'linebreak'
    fillColor: Color? = null
    textColor: Color? = 20
    cellWidth: 'auto'|'wrap'|number = 'auto'
    minCellWidth: number? = 10
    minCellHeight: number = 0
    halign: 'left'|'center'|'right' = 'left'
    valign: 'top'|'middle'|'bottom' = 'top'
    fontSize: number = 10
    cellPadding: Padding = 10
    lineColor: Color = 10
    lineWidth: border = 0 // If 0, no border is drawn
    
    * Document

    line(x1,y1,x2,y2, style)				// Draw a line. Valid styles include: 'S' [default] - stroke, 'F' - fill, and 'DF' (or 'FD') - fill then stroke. 
    rect(x, y, w, h, style) 			// Add a rectangle at x,y position (style: Valid styles include: 'S' [default] - stroke, 'F' - fill, and 'DF' (or 'FD') - fill then stroke.)
    roundedRect(x, y, w, h, rx, ry, style)	// Add a rounded rectangle at x,y. Rounded values at rx, ry
    triangle(x1, y1, x2, y2, x3, y3, style)	// Adds a triangle to PDF.
    setTextColor(ch1, ch2, ch3, ch4)		// Sets the text color for upcoming elements in CMYK format
    setCharSpace(charSpace)			// Set global value of CharSpace.
    setCreationDate(date)
    setFontSize(size)				// Sets font size for upcoming text elements
    setFontStyle(style)				// Switches font style or variant for upcoming text elements, while keeping the font face or family same
    addPage()					// AddsetPage(page)
    movePage(targetPage, beforePage) 
    setPage(page)				// Sets focus to (page)
    setLineWidth(width) 			// Sets line width for upcoming lines.
    setLineHeightFactor(value)			// Sets the LineHeightFactor of proportion. Default: 1.15.
    setFillColor(ch1, ch2, ch3, ch4)		// Sets the fill color for upcoming elements. Depending on the number of arguments given, Gray, RGB, or CMYK color space is implied.
    setDrawColor(ch1, ch2, ch3, ch4
    
*/
