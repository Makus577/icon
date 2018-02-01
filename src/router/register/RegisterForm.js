import React, { Component } from 'react'
import PropTypes from 'prop-types'
import code from 'images/register/code.png'
import { withRouter } from 'react-router-dom'

class RegisterForm extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        console.log(this.props)
        e.preventDefault()
        this.props.history.push({ pathname: '/validate'})
    }
    render() {
        return (
            <div className='register-from center'>
                <form onSubmit={this.handleSubmit}>
                    <div className='from-items'>
                        <label>用户名</label>
                        <div className='from-item'>
                            <input type="text" name='userName' placeholder='用户名' />
                            <span className='register-prompt'>由汉字、英文字母、数字或下划线组成，首字符不能为数字和特殊字符。6-24位，一个汉字占两个字符。</span>
                        </div>

                    </div>
                    <div className='from-items'>
                        <label>密码</label>
                        <div className='from-item'>
                            <input type="password" name='password' placeholder='********' />
                            <span className='register-prompt'>由英文字母、数字或英文特殊字符组成，6-24位。</span>
                        </div>

                    </div>
                    <div className='from-items'>
                        <label>确认密码</label>
                        <div className='from-item'>
                            <input type="password" name='repassword' placeholder='********' />
                        </div>
                    </div>
                    <div className='verification-code '>
                        <label>验证码</label>
                        <div className='center'>
                            <input type="text" />
                            <img src={code} alt="" />
                            <a href="#">看不清？换一张</a>
                        </div>
                    </div>
                    <div className='from-items'>
                        <label></label>
                        <div className='from-checkbox center'>
                            <input type="checkbox" className='register' name="agree" id="" />
                            <span>同意 《<a href="#">精禾云平台服务条款</a>》</span>
                        </div>
                    </div>
                    <div className='from-items'>
                        <label></label>
                        <input type="submit" className='register-submit' value='下一步' />
                    </div>
                </form>
            </div>

        )
    }
}
RegisterForm.propTypes = {
    history: PropTypes.object
}
export default withRouter(RegisterForm)