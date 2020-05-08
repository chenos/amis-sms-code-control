import * as React from 'react';
// @ts-ignore
import { FormItem } from 'amis';
// @ts-ignore
import Input from 'amis/lib/components/Input';
import get from 'lodash/get';

export interface RenderProps {
  type: 'sms-code';
  label?: string;
  placeholder?: string;
  name?: string;
  phoneField?: string;
  api?: any;
  [key: string]: any;
}

@FormItem({
  type: 'sms-code',
})
// @ts-ignore
export class SmsCodeControl extends React.Component<RenderProps, any> {
  state = {
    text: "发送验证码",
    disabled: false,
  };

  interval = null;

  countDown = (i) => {
    this.setState({disabled: true});
    this.interval = setInterval(() => {
      this.setState({text: i+' 后重新获取'});
      i--;
      if (!i) {
        clearInterval(this.interval);
        this.setState({text: '发送验证码', disabled: false});
      }
    }, 1000);
  }

  render() {
    const {api, name, placeholder, value = '', phoneField = 'phone', onChange, formStore, env} = this.props;
    return (
      <div style={{display: 'flex'}}>
        <span style={{marginRight: 10, width: '100%'}}>
          <div className="a-TextControl-input">
            <Input
              type="text"
              value={value}
              autoComplete={'off'}
              placeholder={placeholder}
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          </div>
        </span>
        <span>
          <button
            disabled={this.state.disabled}
            type="button"
            className="a-Button a-Button--default a-Form-control"
            onClick={async () => {
              const r = await formStore.validateFields([phoneField]);
              if (!r) {
                return;
              }
              this.countDown(60);
              env
                .fetcher(api, formStore.data).then(({data}) => {
                  onChange(get(data, name));
                })
                .catch(e => {
                  clearInterval(this.interval);
                  this.setState({text: '发送验证码', disabled: false});
                  if (env.isCancel(e)) {
                    return;
                  }
                  env.notify('error', e.message);
                });
            }}
          >
            <span>{this.state.text}</span>
          </button>
        </span>
      </div>
    );
  }
}
