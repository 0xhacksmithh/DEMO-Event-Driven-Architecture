import { EventEmitter } from "node:events";

export class OrderService extends EventEmitter{

    createOrder(orderData){
        // create order logic

        // if sucess
        this.emit('order:created', orderData);

        return { id: Date.now().toString(),  ...orderData};
    }
}

/***
 * 
 * INITIAL CODE BEFORE DECOUPLING
 * 
 */
// export class OrderService{
//     // Receiving dependencies
//     constructor(emailService, inventoryService){
//         this.emailService = emailService;
//         this.inventoryService = inventoryService;
//     }

//     createOrder(orderData){
//         // create order logic

//         // if sucess
//         this.emailService.sendEmail(orderData);
//         this.inventoryService.updateInventory(orderData);

//         return { id: Date.now().toString(),  ...orderData};
//     }
// }