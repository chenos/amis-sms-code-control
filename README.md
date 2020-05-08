
```bash
yarn add amis-sms-code-control
```

载入组件

```js
import 'amis-sms-code-control';
```

自定义

```js
import { FormItem } from 'amis';
import { SmsCodeControl } from 'amis-sms-code-control';

@FormItem({
  type: 'custom-sms-code',
})
class CustomSmsCodeControl extends SmsCodeControl {
  // 自定义代码
}
```

配置

```js
{
  type: 'form',
  controls: [
    {
      "type": "text",
      "name": "phone",
      "required": true,
      "validations": "isPhoneNumber",
      "placeholder": "请输入手机",
      "label": "手机",
    },
    {
      "type": "sms-code",
      "label": '验证码',
      "placeholder": "请输入验证码",
      "name": "code",
      "phoneField": "phone", // 与填写手机的字段 name 对应
      "api": {
        "method": "post",
        "url": "/code",
        "data": {
          "phone": "${phone}" // 与填写手机的字段 name 对应
        },
      },
      "validations": {
        isNumeric: true,
        isLength: 6
      },
      "required": true,
    },
  ]
}
```