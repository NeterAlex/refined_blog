import React, {Component} from 'react';
import {IconReload} from "@tabler/icons-react";

function _inheritsLoose(subClass: any, superClass: any) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}

function _assertThisInitialized(self: any) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
}

var styles = {"react__captcha": "_1rKPV", "react__captcha__icon__wrapper": "_2M91i", "react__captcha__canvas": "_nTXn5"};

var ReactCaptchaa = /*#__PURE__*/function (_Component) {
    _inheritsLoose(ReactCaptchaa, _Component);

    function ReactCaptchaa(props: any) {
        var _this;

        // @ts-ignore
        _this = _Component.call(this, props) || this;
        _this.canvasRef = React.createRef();
        _this.initializeCaptchaText = _this.initializeCaptchaText.bind(_assertThisInitialized(_this));
        _this.createCaptcha = _this.createCaptcha.bind(_assertThisInitialized(_this));
        _this.state = {
            captchaText: ''
        };
        return _this;
    }

    var _proto = ReactCaptchaa.prototype;

    _proto.initializeCaptchaText = function initializeCaptchaText() {
        var charsArray = this.props.charactersInclude;
        var lengthOtp = this.props.captchaLength;
        var captcha = [];

        for (var i = 0; i < lengthOtp; i++) {
            var index = Math.floor(Math.random() * charsArray.length + 1);
            if (captcha.indexOf(charsArray[index]) === -1) captcha.push(charsArray[index]); else i--;
        }

        return captcha.join('');
    };

    _proto.createCaptcha = function createCaptcha(e: any) {
        var _this2 = this;

        this.setState({
            captchaText: this.initializeCaptchaText()
        }, function () {
            var canvas = _this2.canvasRef.current;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            canvas.height = _this2.props.height;
            canvas.width = _this2.props.width;
            context.font = _this2.props.fontSize + " " + _this2.props.font;
            context.strokeStyle = _this2.props.fontColor;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.strokeText(_this2.state.captchaText, centerX, centerY);

            _this2.props.captchaText(_this2.state.captchaText);

            try {
                var _this2$props;

                if ((_this2$props = _this2.props) !== null && _this2$props !== void 0 && _this2$props.captchaButtonClick) _this2.props.captchaButtonClick(e);
            } catch (err) {
            }
        });
    };

    _proto.componentDidMount = function componentDidMount() {
        var canvas = this.canvasRef.current;
        var context = canvas.getContext('2d');
        canvas.height = this.props.height;
        canvas.width = this.props.width;
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        context.font = this.props.fontSize + " " + this.props.font;
        context.strokeStyle = this.props.fontColor;
        var captchaText = this.initializeCaptchaText();
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.strokeText(captchaText, centerX, centerY);
        this.props.captchaText(captchaText);
        this.setState({
            captchaText: captchaText
        });
    };

    _proto.render = function render() {
        return /*#__PURE__*/React.createElement("div", {
            className: styles.react__captcha + " " + this.props.containerClassName
        }, /*#__PURE__*/React.createElement("canvas", {
            onClick: this.props.onCanvasClick,
            ref: this.canvasRef,
            className: styles.react__captcha__canvas + " " + this.props.canvasClassName
        }), /*#__PURE__*/React.createElement("div", {
            onClick: this.createCaptcha,
            className: styles.react__captcha__icon__wrapper + " " + this.props.iconWrapperClassName
        }, /*#__PURE__*/React.createElement(IconReload, {size: 16, color: '#878e95'})));
    };
    return ReactCaptchaa;
}(Component);
// @ts-ignore
ReactCaptchaa.defaultProps = {
    fontSize: '25px',
    fontColor: '#109CF1',
    font: 'Georgia',
    height: 50,
    width: 100,
    backgroundColor: '#fff',
    containerClassName: 'react-captcha',
    iconWrapperClassName: 'react-captcha-icon-wrapper',
    canvasClassName: 'react-captcha-canvas',
    iconClassName: 'react-captcha-icon',
    captchaLength: 6,
    iconColor: '#fff',
    iconName: 'FiRefreshCw',
    iconSize: '1em',
    charactersInclude: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*'
};

export default ReactCaptchaa;