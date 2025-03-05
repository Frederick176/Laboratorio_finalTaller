import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "API Productos y ventas en línea",
            version: "1.0.0",
            description: "API para la gestion de productos y ventas en línea",
            contact: {
                name: "Fredy Hernández",
                email: "fhernandez-2023176@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3000/ProductosYVentasEnLinea/v1"
            }
        ]
    },
    apis: [
        "./src/auth/*.js",
        "./src/user/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }