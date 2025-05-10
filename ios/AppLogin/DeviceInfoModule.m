#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DeviceInfoModule, NSObject)

RCT_EXTERN_METHOD(getSystemVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
