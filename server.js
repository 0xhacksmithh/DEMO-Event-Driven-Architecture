import express from 'express'
import { OredrController } from './orderController.js';
import { EmailService } from './emailService.js';
import { InventoryService } from './inventoryService.js';
import { OrderService } from './orderService.js';

const server = express();

server.use(express.json());


// Dependency Initialization

const orderService = new OrderService();
const emailService = new EmailService(orderService);
const inventoryService = new InventoryService();

const orderController = new OredrController(orderService);

/**
 * Register Listeners (subscribers)
 */
// orderService.on('order:created',(orderdata)=>{   // Another way to listen emit by passing emitter in email service instance
//     emailService.sendEmail(orderdata);
// });

orderService.on('order:created', (orderdata)=>{
    inventoryService.updateInventory(orderdata);
});

// These run synchronously but we can make them asynchronous as well
// orderService.on('order:created', async (orderdata)=>{
//     emailService.sendEmail(orderdata);
// });

// orderService.on('order:created', async (orderdata)=>{
//     inventoryService.updateInventory(orderdata);
// });

// Routes
server.post("/orders", (req, res)=> orderController.create(req, res));


server.listen(3000, ()=>{
    console.log("Server running on POrt 3000");
})



/***
 * 
 * INITIAL CODE BEFORE DECOUPLING
 * 
 */
// import express from 'express'
// import { OredrController } from './orderController.js';
// import { EmailService } from './emailService.js';
// import { InventoryService } from './inventoryService.js';
// import { OrderService } from './orderService.js';

// const server = express();

// server.use(express.json());


// // Dependency Initialization

// const emailService = new EmailService();
// const inventoryService = new InventoryService();
// const orderService = new OrderService(emailService, inventoryService);

// const orderController = new OredrController(orderService);


// // Routes
// server.post("/orders", (req, res)=> orderController.create(req, res));


// server.listen(3000, ()=>{
//     console.log("Server running on POrt 3000");
// })