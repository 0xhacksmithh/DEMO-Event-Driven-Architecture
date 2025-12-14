export class EmailService{

    constructor(orderEmitter){
        orderEmitter.on('order:created', this.sendEmail);
    }

    sendEmail(orderData){
        console.log("Sending Email...........");
    }
}