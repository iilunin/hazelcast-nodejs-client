/* tslint:disable */
import ClientMessage = require('../ClientMessage');
import {BitsUtil} from '../BitsUtil';
import Address = require('../Address');
import {AddressCodec} from './AddressCodec';
import {MemberCodec} from './MemberCodec';
import {Data} from '../serialization/Data';
import {EntryViewCodec} from './EntryViewCodec';
import DistributedObjectInfoCodec = require('./DistributedObjectInfoCodec');
import {MapMessageType} from './MapMessageType';

var REQUEST_TYPE = MapMessageType.MAP_TRYLOCK;
var RESPONSE_TYPE = 101;
var RETRYABLE = true;


export class MapTryLockCodec{



static calculateSize(name : string  , key : Data  , threadId : any  , lease : any  , timeout : any  , referenceId : any ){
// Calculates the request payload size
var dataSize : number = 0;
            dataSize += BitsUtil.calculateSizeString(name);
            dataSize += BitsUtil.calculateSizeData(key);
            dataSize += BitsUtil.LONG_SIZE_IN_BYTES;
            dataSize += BitsUtil.LONG_SIZE_IN_BYTES;
            dataSize += BitsUtil.LONG_SIZE_IN_BYTES;
            dataSize += BitsUtil.LONG_SIZE_IN_BYTES;
return dataSize;
}

static encodeRequest(name : string, key : Data, threadId : any, lease : any, timeout : any, referenceId : any){
// Encode request into clientMessage
var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name, key, threadId, lease, timeout, referenceId));
clientMessage.setMessageType(REQUEST_TYPE);
clientMessage.setRetryable(RETRYABLE);
    clientMessage.appendString(name);
    clientMessage.appendData(key);
    clientMessage.appendLong(threadId);
    clientMessage.appendLong(lease);
    clientMessage.appendLong(timeout);
    clientMessage.appendLong(referenceId);
clientMessage.updateFrameLength();
return clientMessage;
}

static decodeResponse(clientMessage : ClientMessage,  toObjectFunction: (data: Data) => any = null){
// Decode response from client message
var parameters :any = { 'response' : null  };
                    parameters['response'] = clientMessage.readBoolean();
return parameters;

}


}
