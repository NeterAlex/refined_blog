import {Anchor, Box, Button, Checkbox, Container, Group, Modal, Paper, PasswordInput, rem, ScrollArea, Text, TextInput, Title,} from '@mantine/core';
import {useRouter} from "next/router";
import {hasLength, isEmail, isNotEmpty, matches, useForm} from "@mantine/form";
import {useDisclosure} from "@mantine/hooks";
import axios from "axios";
import qs from "querystring"
import {notifications} from "@mantine/notifications";
import {useState} from "react";
import {Page} from "@/common/types";
// @ts-ignore
import ReactCaptchaa from "@/utils/captcha/captcha"

const RegisterPage: Page = () => {
    const router = useRouter()
    const [agree, setAgree] = useState(false)
    const [opened, {open, close}] = useDisclosure(false)
    const [captcha, setCaptcha] = useState('')
    const [captchaValue, setCaptchaValue] = useState('')

    const agreement = (<>
        <h1>用户协议</h1>
        <p><i>Refind站点</i>（以下简称“我们”）依据本协议为用户（以下简称“你”）提供<i>精锻地</i>服务。本协议对你和我们均具有法律约束力。</p>
        <h4>一、本服务的功能</h4>
        <p>你可以使用本服务浏览文章、发表评论。</p>
        <h4>二、责任范围及限制</h4>
        <p>你使用本服务得到的结果仅供参考，实际情况以官方为准。</p>
        <h4>三、隐私保护</h4>
        <p>我们重视对你隐私的保护，你的个人隐私信息将根据《隐私政策》受到保护与规范，详情请参阅《隐私政策》。</p>
        <h4>四、其他条款</h4>
        <p>4.1 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>
        <p>4.2 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
    </>)
    const privacy = (<>
        <h1>隐私政策</h1>
        <div>更新日期：<strong>2023/4/25</strong></div>
        <div>生效日期：<strong>2023/4/25</strong></div>
        <h2>导言</h2>
        <p>
            <i>精锻地</i> 是一款由 <i>Refined站点</i> （以下简称“我们”）提供的产品。
            您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。
            本《隐私政策》与您所使用的 <i>精锻地</i> 服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，并提供进一步说明的链接，以便您的理解。
        </p>
        <p><strong>您使用或继续使用我们的服务，即意味着同意我们按照本《隐私政策》收集、使用、储存和分享您的相关信息。</strong></p>
        <p>如对本《隐私政策》或相关事宜有任何问题，请通过 <strong>neteralex@outlook.com</strong> 与我们联系。</p>
        <h2>1. 我们收集的信息</h2>
        <p>我们或我们的第三方合作伙伴提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。</p>
        <ul>
            <li><strong>个人信息</strong>，您在注册账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码、电子邮件等。</li>
        </ul>
        <h2>2. 信息的存储</h2>
        <strong>2.1 信息存储的方式和期限</strong>
        <ul>
            <li>我们会通过安全的方式存储您的信息，包括本地存储（例如利用APP进行数据缓存）、数据库和服务器日志。</li>
            <li>一般情况下，我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下存储您的个人信息。</li>
        </ul>
        <strong>2.2 信息存储的地域</strong>
        <ul>
            <li>我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。</li>
            <li>目前我们不会跨境传输或存储您的个人信息。将来如需跨境传输或存储的，我们会向您告知信息出境的目的、接收方、安全保证措施和安全风险，并征得您的同意。</li>
        </ul>
        <strong>2.3 产品或服务停止运营时的通知</strong>
        <ul>
            <li>当我们的产品或服务发生停止运营的情况时，我们将以推送通知、公告等形式通知您，并在合理期限内删除您的个人信息或进行匿名化处理，法律法规另有规定的除外。</li>
        </ul>
        <h2>3. 信息安全</h2>
        <p>
            我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如SSL）来保护您提供的个人信息。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。
        </p>
        <h2>4. 我们如何使用信息</h2>
        <p>我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：</p>
        <ul>
            <li>向您提供服务；</li>
            <li>在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；</li>
            <li>帮助我们设计新服务，改善我们现有服务；</li>
            <li>使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他用户作出其他方面的回应；</li>
            <li>向您提供与您更加相关的广告以替代普遍投放的广告；</li>
            <li>评估我们服务中的广告和其他促销及推广活动的效果，并加以改善；</li>
            <li>软件认证或管理软件升级；</li>
            <li>让您参与有关我们产品和服务的调查。</li>
        </ul>

        <h2>5. 信息共享</h2>
        <p>
            目前，我们不会主动共享或转让您的个人信息至第三方，如存在其他共享或转让您的个人信息或您需要我们将您的个人信息共享或转让至第三方情形时，我们会直接或确认第三方征得您对上述行为的明示同意。
        </p>
        <p>
            为了投放广告，评估、优化广告投放效果等目的，我们需要向广告主及其代理商等第三方合作伙伴共享您的部分数据，要求其严格遵守我们关于数据隐私保护的措施与要求，包括但不限于根据数据保护协议、承诺书及相关数据处理政策进行处理，避免识别出个人身份，保障隐私安全。
        </p>
        <p>
            我们不会向合作伙伴分享可用于识别您个人身份的信息（例如您的姓名或电子邮件地址），除非您明确授权。
        </p>
        <p>
            我们不会对外公开披露所收集的个人信息，如必须公开披露时，我们会向您告知此次公开披露的目的、披露信息的类型及可能涉及的敏感信息，并征得您的明示同意。
        </p>
        <p>
            随着我们业务的持续发展，我们有可能进行合并、收购、资产转让等交易，我们将告知您相关情形，按照法律法规及不低于本《隐私政策》所要求的标准继续保护或要求新的控制者继续保护您的个人信息。
        </p>
        <p>
            另外，根据相关法律法规及国家标准，以下情形中，我们可能会共享、转让、公开披露个人信息无需事先征得您的授权同意：
        </p>
        <ul>
            <li>与国家安全、国防安全直接相关的；</li>
            <li>与公共安全、公共卫生、重大公共利益直接相关的；</li>
            <li>犯罪侦查、起诉、审判和判决执行等直接相关的；</li>
            <li>出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</li>
            <li>个人信息主体自行向社会公众公开个人信息的；</li>
            <li>从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</li>
        </ul>

        <h2>6. 您的权利</h2>
        <p>
            在您使用我们的服务期间，我们可能会视产品具体情况为您提供相应的操作设置，以便您可以查询、删除、更正或撤回您的相关个人信息，您可参考相应的具体指引进行操作。此外，我们还设置了投诉举报渠道，您的意见将会得到及时的处理。如果您无法通过上述途径和方式行使您的个人信息主体权利，您可以通过本《隐私政策》中提供的联系方式提出您的请求，我们会按照法律法规的规定予以反馈。
        </p>
        <p>当您决定不再使用我们的产品或服务时，可以申请注销账户。注销账户后，除法律法规另有规定外，我们将删除或匿名化处理您的个人信息。</p>

        <h2>7. 变更</h2>
        <p>
            我们可能适时修订本《隐私政策》的条款。当变更发生时，我们会在版本更新时向您提示新的《隐私政策》，并向您说明生效日期。请您仔细阅读变更后的《隐私政策》内容，<strong>若您继续使用我们的服务，即表示您同意我们按照更新后的《隐私政策》处理您的个人信息。</strong>
        </p>

        <h2>8. 未成年人保护</h2>
        <p>
            我们鼓励父母或监护人指导未满十八岁的未成年人使用我们的服务。我们建议未成年人鼓励他们的父母或监护人阅读本《隐私政策》，并建议未成年人在提交的个人信息之前寻求父母或监护人的同意和指导。
        </p>
    </>)

    const form = useForm({
        initialValues: {username: '', password: '', nickname: '', email: ''},
        validate: {
            username: isNotEmpty('请设置用户名') && matches(/^[a-z0-9_-]{6,15}$/, '用户名只应包含大小写字母和数字，且在6-15位间'),
            password: hasLength({min: 6, max: 18}, '密码长度必须为6-18位'),
            nickname: isNotEmpty('请设置昵称'),
            email: isEmail('请输入正确的邮箱地址'),
        }
    })

    return (
        <Container size={420} mt={60}>
            <Title
                align="center"
                sx={(theme) => ({fontFamily: `${theme.fontFamily}`, fontWeight: 900})}
            >
                欢迎
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                已有账号？{' '}
                <Anchor size="sm" component="button" onClick={() => router.push('/auth/login')}>登录</Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={form.onSubmit((data) => {
                axios.post('/user/register', qs.stringify(data), {}).catch(e => {
                    notifications.show({title: '注册错误', message: e.response.message, color: 'red'})
                    return Promise.reject('Failed to register')
                }).then((r) => {
                    notifications.show({title: '注册成功', message: '请登录', color: 'green'})
                    router.push('/auth/login')
                })
            })}>
                <TextInput mt="md" label={"用户名"} placeholder={'用于登录的账号'} required
                           withAsterisk {...form.getInputProps('username')}/>
                <PasswordInput label="密码" placeholder="登录凭证" required mt="md" withAsterisk {...form.getInputProps('password')}/>
                <TextInput mt="md" label={"电子邮件"} placeholder={'用于联系以及登陆账号'} required
                           withAsterisk {...form.getInputProps('email')}/>
                <TextInput mt="md" label={"昵称"} placeholder={'显示的用户名称'} required
                           withAsterisk {...form.getInputProps('nickname')}/>

                <TextInput width={'100%'} rightSection={
                    <Box pr={75}>
                        <ReactCaptchaa captchaText={(code: any) => setCaptcha(code)} captchaLength={4}
                                       height={30} width={80} fontSize={'1em'}
                                       charactersInclude={"0123456789abcdefghijklmnopqrstuvwxzABCDEFGHIJKLMNOPQRSTUVWXYZ"}
                                       containerClassName={'react-captcha'}
                                       iconWrapperClassName={'react-captcha-icon-wrapper'}
                                       canvasClassName={'react-captcha-canvas'}
                                       iconClassName={'react-captcha-icon'}/>
                    </Box>
                }
                           mt="md" label={"验证码"} placeholder={'验证码(大小写敏感)'}
                           value={captchaValue} onChange={(e) => setCaptchaValue(e.currentTarget.value)} required/>

                <Group spacing={rem(10)} mt="lg">
                    <Checkbox checked={agree} onChange={(e) => setAgree(e.currentTarget.checked)} label='同意'/>
                    <Button onClick={open} variant={'default'} compact>用户协议及隐私政策</Button>
                </Group>
                <Button disabled={(!agree) || captchaValue !== captcha} fullWidth mt="xl" type="submit">
                    注册
                </Button>
            </Paper>
            <Modal opened={opened} onClose={close} title="用户协议及隐私政策" scrollAreaComponent={ScrollArea.Autosize}>
                {agreement}
                {privacy}
            </Modal>
        </Container>
    );
}

export default RegisterPage
RegisterPage.Layout = 'Main'