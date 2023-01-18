import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

interface Msg{
    sender: string;
    receiver: string;
    message: string;
}

interface GetRequest{
    sender: string;
    receiver: string;
}

@WebSocketGateway({
    cors: ['*'],
})
export class AppGateway{
    @WebSocketServer()
    server: Server;

    messages: Msg[] = [];

    @SubscribeMessage('send')
    handleSend(@MessageBody() body: Msg) {
        console.log(body);
        this.server.emit('onSend', body);   
    }

    @SubscribeMessage('get')
    handleGet(@MessageBody() body: GetRequest){
        for(const msg of this.messages){
            if((msg.sender === body.sender && msg.receiver === body.receiver) || (msg.sender === body.receiver && msg.receiver === body.sender)){
                console.log('found');
                console.log(msg.message);
                this.server.emit('onGet', {data: msg.message});
            }
        }
    }
}