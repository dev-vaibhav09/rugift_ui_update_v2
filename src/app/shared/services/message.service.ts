import {Injectable} from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private message: NzMessageService
  ) {}

  confirm(title: string, text: string) {
    return new Promise<boolean>((resolve) => {
      this.modal.confirm({
        nzTitle: title,
        nzContent: text,
        nzOkText: 'Confirm',
        nzOkType: 'primary',
        nzCancelText: 'Cancel',
        nzOnOk: () => resolve(true),
        nzOnCancel: () => resolve(false)
      });
    });
  }

  verify(title: string, text: string) {
    return new Promise<boolean>((resolve) => {
      this.modal.info({
        nzTitle: title,
        nzContent: text,
        nzOkText: 'Verify',
        nzOkType: 'primary',
        nzCancelText: 'Cancel',
        nzOnOk: () => resolve(true),
        nzOnCancel: () => resolve(false)
      });
    });
  }

  success(text: string) {
    this.notification.success('Success', text, {
      nzPlacement: 'topRight',
      nzDuration: 5000
    });
  }

  warning(text: string) {
    this.notification.warning('Warning', text, {
      nzPlacement: 'topRight',
      nzDuration: 5000
    });
  }

  error(text: string) {
    this.notification.error('Error', text, {
      nzPlacement: 'topRight',
      nzDuration: 5000
    });
  }

  info(text: string) {
    this.notification.info('Info', text, {
      nzPlacement: 'topRight',
      nzDuration: 5000
    });
  }

  customModal(title: string, content: string, okText: string, cancelText: string) {
    return new Promise<boolean>((resolve) => {
      this.modal.create({
        nzTitle: title,
        nzContent: content,
        nzOkText: okText,
        nzCancelText: cancelText,
        nzOnOk: () => resolve(true),
        nzOnCancel: () => resolve(false)
      });
    });
  }

  loadingIndicator(message: string): NzModalRef {
    return this.modal.create({
      nzContent: message,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false
    });
  }

  closeLoadingIndicator(modal: NzModalRef) {
    modal.destroy();
  }

  basicMessage(text: string, type: 'success' | 'info' | 'warning' | 'error') {
    this.message.create(type, text);
  }
}
