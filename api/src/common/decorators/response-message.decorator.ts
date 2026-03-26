import { SetMetadata } from '@nestjs/common';

const RESPONSE_MESSAGE_KEY = 'response_message';
const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE_KEY, message);

export default ResponseMessage;
