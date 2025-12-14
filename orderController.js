export class OredrController{

    constructor(orderService){
        this.orderService = orderService;
    }

    create(req, res){
        const order = this.orderService.createOrder(req.body);
        res.send(order);
    }
}