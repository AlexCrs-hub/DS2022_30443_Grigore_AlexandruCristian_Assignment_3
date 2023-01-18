import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller} from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

interface ChatMessage {
    username: string;
    msg: string;  
}

interface Message {
    msg: string;  
}

@Controller('chat')
export class ChatController{
    @GrpcMethod('ChatService','SendMessage')
    async SendMessage(data: ChatMessage): Promise<Message> {
        console.log(data);
        const msg: Message = {msg: data.msg};
        return msg;
    }
}