import Foundation
import UIKit

@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {

  @objc
  func getSystemVersion(_ resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: @escaping RCTPromiseRejectBlock) {
    let version = UIDevice.current.systemVersion
    resolve(version)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
