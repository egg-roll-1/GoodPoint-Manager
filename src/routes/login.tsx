import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/features/auth/hooks/useAuth'
import { LoginForm, type LoginRequest } from '@/features/auth/model/auth.request'
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute } from '@tanstack/react-router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSearchSchema = z.object({
    redirect: z.string()
})

export const Route = createFileRoute('/login')({
    component: LoginPage,
    validateSearch: loginSearchSchema
})

function LoginPage() {
    const { mutate: login, isPending } = useLogin()
    const form = useForm<LoginRequest>({
        resolver: zodResolver(LoginForm),
        defaultValues: {
            phoneNumber: '',
            password: ''
        }
    });

    const onSubmit = useCallback((values: LoginRequest) => {
        login(values);
    }, [login])

    return <main className=''>
        <div className='max-w-md mx-auto w-full min-h-svh flex items-center'>
            <div className='w-full p-3'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-primary font-semibold text-xl'>
                            Good Point
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
                                <div className='space-y-6'>
                                    <FormField
                                        control={form.control}
                                        name='phoneNumber'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>휴대폰 번호</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>비밀번호</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit' className='w-full' disabled={isPending}>
                                    {isPending ? '로그인중...' : '로그인'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
}