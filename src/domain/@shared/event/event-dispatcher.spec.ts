import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log1.handler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log2.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customer1EventHandler = new EnviaConsoleLog1Handler();
    const customer2EventHandler = new EnviaConsoleLog2Handler();
    const customer3EventHandler = new EnviaConsoleLog1Handler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer1EventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer2EventHandler);
    eventDispatcher.register("CustomerAddressChangedEvent", customer2EventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customer1EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customer2EventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customer3EventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customer1EventHandler = new EnviaConsoleLog1Handler();
    const customer2EventHandler = new EnviaConsoleLog2Handler();
    const customer3EventHandler = new EnviaConsoleLog1Handler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer1EventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer2EventHandler);
    eventDispatcher.register("CustomerAddressChangedEvent", customer3EventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customer1EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customer2EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customer3EventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregister("CustomerCreatedEvent", customer1EventHandler);
    eventDispatcher.unregister("CustomerCreatedEvent", customer2EventHandler);
    eventDispatcher.unregister("CustomerAddressChangedEvent", customer3EventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customer1EventHandler = new EnviaConsoleLog1Handler();
    const customer2EventHandler = new EnviaConsoleLog2Handler();
    const customer3EventHandler = new EnviaConsoleLog1Handler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer1EventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer2EventHandler);
    eventDispatcher.register("CustomerAddressChangedEvent", customer3EventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customer1EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customer2EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customer3EventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customer1EventHandler = new EnviaConsoleLog1Handler();
    const customer2EventHandler = new EnviaConsoleLog2Handler();
    const customer3EventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyCustomer1EventHandler = jest.spyOn(customer1EventHandler, "handle");
    const spyCustomer2EventHandler = jest.spyOn(customer2EventHandler, "handle");
    const spyCustomer3EventHandler = jest.spyOn(customer3EventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer1EventHandler);
    eventDispatcher.register("CustomerCreatedEvent", customer2EventHandler);
    eventDispatcher.register("CustomerAddressChangedEvent", customer3EventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customer1EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customer2EventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customer3EventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Customer 1",
      Address: {
        street: "Street 1",
        number: 1, 
        zip: "Zipcode 1",
        city: "City 1"
      }
    });

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "123",
      name: "Customer 1",
      Address: {
        street: "Street 1",
        number: 1, 
        zip: "Zipcode 1",
        city: "City 1"
      }
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);
    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyCustomer1EventHandler).toHaveBeenCalled();
    expect(spyCustomer2EventHandler).toHaveBeenCalled();
    expect(spyCustomer3EventHandler).toHaveBeenCalled();
  });
});
