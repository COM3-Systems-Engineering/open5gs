import Head from 'next/head';
import PropTypes from 'prop-types';

import { media } from 'helpers/style-utils';
import oc from 'open-color';
import styled from 'styled-components';

import ArrowForward from 'react-icons/lib/md/arrow-forward';
import CloseIcon from 'react-icons/lib/md/close';

const Wrapper = styled.div`
  position: fixed;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid ${oc.gray[4]};
  border-radius: 12px;

  width: ${props => props.width};
  ${media.mobile`
    top: 0;
    left: 0;
    transform: translate(0, 0);

    width: 100%;
  `}
`;

Wrapper.propTypes = {
  width: PropTypes.string
}

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;

  font-size: 1rem;
  line-height: 3rem;
  color: ${oc.gray[7]};

  background-color: ${oc.pink[2]};
  border-bottom: 1px solid ${oc.pink[3]};
  box-shadow: 1px 1px 2px ${oc.pink[3]};
`;

const ErrorMessage = styled.div`
  padding-left: 1rem;
`;

const ErrorClose = styled.div`
  position: absolute;
  right: 1rem;
`;

const ErrorBar = ({ visible, message, onClose }) => visible ? (
  <ErrorWrapper>
    <ErrorMessage>
      {message}
    </ErrorMessage>
    <ErrorClose onClick={onClose}>
      <CloseIcon />
    </ErrorClose>
  </ErrorWrapper>
) : null;

ErrorBar.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1F2F5D;
`;

const Thumbnail = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding: 3rem 0;
  border-radius: 12px;

  background: white;
`;

const Form = styled.div`
  padding: 1rem;

  background: ${oc.gray[0]};
  border-radius: 12px;
`;

const InputWrapper = styled.div`
  padding: 0.5rem 0;
`;

const Title = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;

  color: ${oc.gray[8]};
`;

const Input = styled.input`
  padding: 0.5rem;

  width: 100%;
  border: 1px solid ${oc.gray[2]};
  border-radius: 6px;

  font-size: 1rem;
  line-height: 1.5rem;

  transition: all .25s;
  outline: none;

  &:focus {
    border: 1px solid ${oc.blue[7]};
  }
`;

const Icon = styled.div`
  display: inline-flex;
  padding-left: 1rem;
  font-size: 1.5rem;
`;

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

const Logo = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const LogoDescription = styled.div`
position: absolute;
  margin-left: 4rem;
  text-align: center;
  font-size: 0.8rem;
  color: ${oc.blue[9]};
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;

  width: 100%;
  border-radius: 12px;

  font-weight: 500;
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  background: ${props => oc[props.color][7]};
  border: 1px solid ${props => oc[props.color][10]};
  outline: none;
  cursor: pointer;

  transition: all .3s;
  &:hover {
    background: ${props => oc[props.color][6]};
  }

  &:active {
    background: ${props => oc[props.color][8]};
    border: 1px solid ${oc.blue[7]};
  }
`;

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func
};

const Login = ({
  width,
  form,
  error,
  innerRef,
  onChange,
  onSubmit,
  onKeyPress,
  onErrorReset
}) => (
  <div>
    <Background />
    <Head>
      <title>COM3 Open5gs - Entrar</title>
    </Head>
    <Wrapper id='nprogress-base-login' width={width}>
      <ErrorBar
        visible={error !== null}
        message={error && error.message}
        onClose={onErrorReset} />
      <Thumbnail>
        <Logo>
          <svg xmlns="http://www.w3.org/2000/svg" width="170" height="38" viewBox="0 0 170 38" fill="none">
            <path d="M19.927 25.2907L18.4382 22.7127H13.3189L11.3175 19.25H7.51971L10.2693 24.015H5.96263C5.69679 23.2443 4.96762 22.6899 4.10553 22.6899C3.02317 22.6899 2.14209 23.5708 2.14209 24.6529C2.14209 25.735 3.02317 26.6158 4.10553 26.6158C4.96382 26.6158 5.69679 26.0615 5.96263 25.2907H19.927ZM4.10553 25.4616C3.65739 25.4616 3.29281 25.0971 3.29281 24.6491C3.29281 24.2011 3.65739 23.8366 4.10553 23.8366C4.55366 23.8366 4.91825 24.2011 4.91825 24.6491C4.91825 25.0971 4.55366 25.4616 4.10553 25.4616Z" fill="#2058A7"></path>
            <path d="M4.26123 10.0121C4.26123 9.3401 4.80811 8.79336 5.48031 8.79336C5.91705 8.79336 6.30062 9.02497 6.5133 9.37048H12.3618L15.1114 4.60547H26.5692L24.7691 7.71886H22.2284L20.5384 10.6462H6.5095C6.29303 10.9917 5.91325 11.2233 5.47651 11.2233C4.80431 11.2271 4.26123 10.6842 4.26123 10.0121Z" fill="#2058A7"></path>
            <path d="M0 17.9704V16.6909H8.13479L10.8844 11.9297H13.6415L15.5822 15.2861H17.8646L16.3151 17.9704H0Z" fill="#2058A7"></path>
            <path d="M9.80963 4.6549C10.6679 4.6549 11.3971 4.10056 11.6667 3.32981H20.3028L22.2283 0H17.7735L16.5886 2.05028H11.6667C11.4009 1.27953 10.6717 0.725192 9.80963 0.725192C8.72727 0.725192 7.84619 1.60605 7.84619 2.68815C7.84619 3.77024 8.72727 4.6549 9.80963 4.6549ZM9.80963 1.87943C10.2578 1.87943 10.6223 2.24392 10.6223 2.69194C10.6223 3.13997 10.2578 3.50446 9.80963 3.50446C9.3615 3.50446 8.99691 3.13997 8.99691 2.69194C9.00071 2.24392 9.36529 1.87943 9.80963 1.87943Z" fill="#2058A7"></path>
            <path d="M11.7466 26.5664H17.2229L14.4886 31.3162L11.7466 26.5664Z" fill="#2058A7"></path>
            <path d="M12.7261 19.25H16.4403L17.7353 21.4939H14.0211L12.7261 19.25Z" fill="#2058A7"></path>
            <path d="M15.0469 11.9297H19.8017L18.5674 14.0711H16.2849L15.0469 11.9297Z" fill="#2058A7"></path>
            <path d="M31.9353 4.9322C31.4036 4.9322 30.9707 4.49936 30.9707 3.96781C30.9707 3.43626 31.4036 3.00342 31.9353 3.00342C32.467 3.00342 32.9 3.43626 32.9 3.96781C32.9 4.49936 32.467 4.9322 31.9353 4.9322Z" fill="#2058A7"></path>
            <path d="M22.312 34.2129C21.7803 34.2129 21.3474 33.78 21.3474 33.2485C21.3474 32.7169 21.7803 32.2841 22.312 32.2841C22.8437 32.2841 23.2766 32.7169 23.2766 33.2485C23.2766 33.78 22.8437 34.2129 22.312 34.2129ZM25.9426 29.277L30.4012 36.9997H17.7737L15.9773 33.8863H20.2954C20.5688 34.7444 21.3701 35.3633 22.3158 35.3633C23.4855 35.3633 24.4349 34.4141 24.4349 33.2447C24.4349 32.0753 23.4855 31.1261 22.3158 31.1261C21.3701 31.1261 20.5688 31.7487 20.2954 32.603H10.5086C10.2541 33.2371 9.6351 33.6851 8.90973 33.6851C7.96029 33.6851 7.18555 32.9144 7.18555 31.9614C7.18555 31.0084 7.95649 30.2376 8.90973 30.2376C9.6351 30.2376 10.2541 30.6856 10.5086 31.3197H15.8862L18.6282 26.5547H20.6676L22.2322 29.2656H25.9426V29.277Z" fill="#2058A7"></path>
            <path d="M49.8229 18.5019L39.1398 37.0038H31.8101L27.3516 29.2773H34.6812L39.6297 20.7079H33.6027L31.6658 24.0604H25.2476L22.0385 18.5019L25.2476 12.9434H31.6696L33.6065 16.2959H39.6335L34.6812 7.72273H26.1781L27.9782 4.60934H29.9151C30.1885 5.46742 30.9898 6.0863 31.9355 6.0863C33.1052 6.0863 34.0546 5.1371 34.0546 3.96768C34.0546 2.79826 33.1052 1.84905 31.9355 1.84905C30.9898 1.84905 30.1885 2.47173 29.9151 3.32601H21.7119L23.6336 0H39.1398L49.8229 18.5019Z" fill="#1E2F5D"></path>
            <path d="M56.3057 15.8591C56.3057 10.4335 60.4604 6.5835 66.1191 6.5835C69.4079 6.5835 72.0588 7.77949 73.7905 9.94748L70.5776 12.852C69.4573 11.5004 68.0787 10.7638 66.3735 10.7638C63.4416 10.7638 61.4022 12.8027 61.4022 15.8591C61.4022 18.9156 63.4416 20.9545 66.3735 20.9545C68.0825 20.9545 69.4573 20.2141 70.5776 18.8662L73.7905 21.7708C72.0588 23.935 69.4079 25.1348 66.1191 25.1348C60.4604 25.1348 56.3057 21.2848 56.3057 15.8591Z" fill="#143F6A"></path>
            <path d="M74.7285 15.8591C74.7285 10.5094 78.9326 6.5835 84.6445 6.5835C90.3563 6.5835 94.5604 10.5056 94.5604 15.8591C94.5604 21.2126 90.3525 25.1348 84.6445 25.1348C78.9364 25.1348 74.7285 21.2088 74.7285 15.8591ZM89.46 15.8591C89.46 12.7761 87.3447 10.7638 84.6445 10.7638C81.9443 10.7638 79.8289 12.7761 79.8289 15.8591C79.8289 18.9421 81.9443 20.9545 84.6445 20.9545C87.3447 20.9545 89.46 18.9421 89.46 15.8591Z" fill="#143F6A"></path>
            <path d="M113.318 24.7779L113.268 15.3238L108.681 23.02H106.436L101.875 15.582V24.7817H97.2114V6.94043H101.366L107.636 17.2336L113.754 6.94043H117.909L117.959 24.7779H113.318Z" fill="#143F6A"></path>
            <path d="M134.342 19.1966C134.342 22.2302 131.946 25.1348 126.568 25.1348C124.096 25.1348 121.472 24.5235 119.637 23.3769L121.472 19.58C122.899 20.5482 124.734 21.057 126.416 21.057C128.125 21.057 129.246 20.3926 129.246 19.1966C129.246 18.1259 128.456 17.4652 126.519 17.4652H124.403V14.2797L127.59 10.8398H120.556V6.94043H133.453V10.0994L129.758 14.0747C132.762 14.7125 134.342 16.6489 134.342 19.1966Z" fill="#143F6A"></path>
          </svg>
        </Logo>
        <LogoDescription>
          <p>Systems Engineering</p>
        </LogoDescription>
      </Thumbnail>
      <Form>
        <InputWrapper>
          <Title>Nome de usuário</Title>
          <Input
            name="username"
            type="text"
            placeholder=""
            value={form.username}
            onChange={onChange}
            onKeyPress={onKeyPress}
            innerRef={(comp) => { innerRef(comp) }}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>Senha</Title>
          <Input
            name="password"
            type="password"
            placeholder=""
            value={form.password}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </InputWrapper>
        <Button color='blue' onClick={onSubmit}>
          Entrar
          <Icon><ArrowForward /></Icon>
        </Button>
      </Form>
    </Wrapper>
  </div>
);

Login.propTypes = {
  width: PropTypes.string
}

Login.defaultProps = {
  width: '360px'
}

export default Login;
