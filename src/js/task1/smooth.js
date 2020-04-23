
// function smoothControlPoints(ct1, ct2, pt) {

//     var x1 = ct1[0] - pt[0],
// 		y1 = ct1[1] - pt[1],
// 		x2 = ct2[0] - pt[0],
//         y2 = ct2[1] - pt[1]
        
// 	if ( (x1 != 0 || y1 != 0) && (x2 != 0 || y2 != 0) ) {

//         var anglea = Math.atan2(y1, x1),
// 			angleb = Math.atan2(y2, x2),
// 			r1 = Math.sqrt(x1*x1+y1*y1),
// 			r2 = Math.sqrt(x2*x2+y2*y2)

//         if (anglea < 0) { anglea += 2*Math.PI }
//         if (angleb < 0) { angleb += 2*Math.PI }

//         var angleBetween = Math.abs(anglea - angleb),
//             angleDiff = Math.abs(Math.PI - angleBetween)/2

//         var new_anglea, new_angleb
// 		if (anglea - angleb > 0) {

// 			new_anglea = angleBetween < Math.PI ? (anglea + angleDiff) : (anglea - angleDiff)
//             new_angleb = angleBetween < Math.PI ? (angleb - angleDiff) : (angleb + angleDiff)
            
// 		} else {

// 			new_anglea = angleBetween < Math.PI ? (anglea - angleDiff) : (anglea + angleDiff)
//             new_angleb = angleBetween < Math.PI ? (angleb + angleDiff) : (angleb - angleDiff)
            
//         }

//         return [
//             [
//                 r1 * Math.cos(new_anglea) + pt[0],
//                 r1 * Math.sin(new_anglea) + pt[1]
//             ],
//             [
//                 r2 * Math.cos(new_angleb) + pt[0],
//                 r2 * Math.sin(new_angleb) + pt[1]
//             ]
//         ]
        
//     }

//     return undefined

// }

export default function(points) {

    if(points.length < 4) return points

    const res = []
    let curpos = points[0], i, prevCtlPt = null

    res.push(['mt', curpos[0], curpos[1]])
    
    for(i = 1; i <= points.length-4; i+=3) {

        let ct1 = points[i]
        let ct2 = points[i+1]
        let end = points[i+2]

        if(prevCtlPt) {

            // var newpts = smoothControlPoints(prevCtlPt, ct1, curpos)
            // if (newpts && newpts.length == 2) {

            //     // check without mt
            //     var prevArr = res[res.length - 1]
            //     res.push(['mt', prevArr[prevArr.length-2], prevArr[prevArr.length-1]])
            //     res.push(['lt', ...newpts[0]])
            //     ct1 = newpts[1]

            // }

        }

        res.push(['bqt', ...ct1, ...ct2, ...end])

        curpos = end
        prevCtlPt = ct2

    }

    while (i < points.length) {

        res.push(['lt', ...points[i]])
        i++

    }

    return res

}
