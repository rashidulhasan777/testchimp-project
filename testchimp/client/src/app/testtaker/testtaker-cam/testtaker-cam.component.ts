import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-testtaker-cam',
  templateUrl: './testtaker-cam.component.html',
  styles: [],
})
export class TesttakerCamComponent {
  // camera

  @Input() showWebcam!: boolean;
  @Input() onlyWebCam: boolean = false;
  @Input() turnOffWebcam!: boolean;
  @Output() setupDoneEmitter = new EventEmitter<boolean>();
  @Output() imageAsDataUrlEmitter = new EventEmitter<string>();
  allowCameraSwitch = true;
  activeDeviceName!: string;
  deviceNames = new Map<string, string>();
  multipleWebcamsAvailable = false;
  deviceId!: string;

  errors: WebcamInitError[] = [];
  webcamImage!: WebcamImage;
  trigger: Subject<void> = new Subject<void>();
  nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
    console.log(error);
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    // this.imagesAsDataUrl.push(webcamImage.imageAsDataUrl);
    // console.log(this.imagesAsDataUrl);
    this.imageAsDataUrlEmitter.emit(webcamImage.imageAsDataUrl);
  }

  showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  cameraWasSwitched(deviceId: string): void {
    if (this.deviceNames.keys.length === 0) {
      WebcamUtil.getAvailableVideoInputs().then(
        (mediaDevices: MediaDeviceInfo[]) => {
          this.multipleWebcamsAvailable =
            mediaDevices && mediaDevices.length > 1;
          console.log(mediaDevices);
          mediaDevices.forEach((mediaDeviceInfo) => {
            this.deviceNames.set(
              mediaDeviceInfo.deviceId,
              mediaDeviceInfo.label,
            );
          });
          console.log('active device: ' + deviceId);
          this.deviceId = deviceId;
          this.activeDeviceName = this.deviceNames.get(deviceId) || '';
          const captureInterval = setInterval(
            () => {
              this.triggerSnapshot();
              // console.log(this.webcamImage);
              if (this.turnOffWebcam) {
                clearInterval(captureInterval);
                console.log('done');
                this.showWebcam = false;
              }
            },
            60000 + Math.floor(Math.random() * 60000),
          );
        },
      );
    } else {
      console.log('active device: ' + deviceId);
      this.deviceId = deviceId;
      this.activeDeviceName = this.deviceNames.get(deviceId) || '';
    }
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  setupDone() {
    this.setupDoneEmitter.emit(true);
  }

  // camera
}
