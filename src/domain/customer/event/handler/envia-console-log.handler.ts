import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const data = event.eventData;
    const address = `${data.Address.street} ${data.Address.number}, ${data.Address.city} - ${data.Address.zip}`;
    console.log(`Endereço do cliente: ${data.id}, ${data.name} alterado para: ${address}`); 
  }
}