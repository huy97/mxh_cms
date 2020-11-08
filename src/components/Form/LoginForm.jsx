import React, {Component} from 'react';
import {FastField, Form, Formik} from "formik";
import styles from "./Login.module.scss";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import ErrorMessage from "./ErrorMessage";


const validationSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu')
});

class LoginForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        onShowRegister: PropTypes.func,
        onLoginFacebook: PropTypes.func
    }

    static defaultProps = {
        onSubmit: () => {},
        onShowRegister: () => {},
        onLoginFacebook: () => {}
    }

    render() {
        const {onSubmit} = this.props;
        return (
            <div>
                <Formik initialValues={{
                    username: "",
                    password: ""
                }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                >
                    <Form className={styles.form}>
                        <FastField name="username">
                            {({ field, form, meta }) => (
                                <input type="text" placeholder="Tên đăng nhập" className="form-input w100p" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="username" />
                        <FastField name="password">
                            {({ field, form, meta }) => (
                                <input type="password" placeholder="Mật khẩu" className="form-input w100p mt10" {...field}/>
                            )}
                        </FastField>
                        <ErrorMessage className="w100p" name="password" />
                        <button type="submit" className="btn btn-primary w100p mt10">Đăng nhập</button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default LoginForm;
