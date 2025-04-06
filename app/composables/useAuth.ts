export const useAuth = () => {
    const { $api } = useNuxtApp()
    const token = useCookie('token')
    const userinfo = useCookie('userinfo')

    // ✅ 登录接口
    const login = async (email: string, password: string) => {
        try {
            const response = await $api('/user/user/loginByEmail', {
                method: 'POST',
                body: { email, password },
            })

            if (response.code == 0) {
                token.value = response.result.token
                userinfo.value = JSON.stringify(response.result.user)
            }

            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }

    const register = async (fullName: string, email: string, password: string, numberAreaCode: string, number: Number) => {
        try {
            const response = await $api('/user/user/create', {
                method: 'POST',
                body: {
                    fullName, email, password, numberAreaCode, number
                },
            })

            if (response.token) {
                token.value = response.token // 🔥 存储 Token（会自动带到 Header）
            }

            return response
        } catch (error) {
            console.error('登录失败:', error)
            throw error
        }
    }
    const sendrepassword = async (email: string, token: string) => {
        try {
            const response = await $api('/user/user/sendRetrievePasswordEmail', {
                method: 'POST',
                body: { email, token },
            })

            return response
        } catch (error) {
            console.error('发送失败:', error)
            throw error
        }
    }
    const updatepassword = async (email: string, code: string, newPassword: string) => {
        try {
            const response = await $api('/user/user/retrievePassword', {
                method: 'POST',
                body: { email, code, newPassword },
            })

            return response
        } catch (error) {
            console.error('修改失败:', error)
            throw error
        }
    }
    // ✅ 退出登录
    const logout = () => {
        token.value = null // 清除 token
        navigateTo('/login') // 跳转到登录页
    }

    return { login, logout, register, sendrepassword, updatepassword, token }
}
