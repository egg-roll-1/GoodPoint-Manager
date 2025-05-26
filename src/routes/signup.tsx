import { PasswordInput } from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignUp } from '@/features/auth/hooks/useAuth'
import { SignUpForm, type SignUpRequest } from '@/features/auth/model/auth.request'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSearchSchema = z.object({
    redirect: z.string()
})

export const Route = createFileRoute('/signup')({
    validateSearch: loginSearchSchema,
    component: RouteComponent,
})

export const SignUpFormId = 'signup-form-id'

function RouteComponent() {
    const { mutate: signUp } = useSignUp();

    const form = useForm<SignUpRequest>({
        resolver: zodResolver(SignUpForm),
        defaultValues: {
            phoneNumber: '',
            password: '',
            name: '',
            age: 0,
            gender: 'M'
        }
    })

    const onSubmit = useCallback(() => {
        const request = form.getValues();
        signUp({ ...request })
    }, [form, signUp])

    return <div className='max-w-md mx-auto w-full min-h-svh flex items-center'>
        <div className='w-full p-3'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-primary font-semibold text-xl'>
                        Good Point
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            id={SignUpFormId}
                            className='space-y-5'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>이름</FormLabel>
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
                                            <PasswordInput {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='phoneNumber'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>전화번호</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => field.onChange((e.target.value || '').replace(/[^0-9]/g, ''))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='age'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>나이</FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => field.onChange(Number(e.target.value || ''))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='gender'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>성별</FormLabel>
                                        <FormControl>
                                            <div className='w-full flex gap-1 bg-secondary p-1 rounded-md'>
                                                <Button
                                                    className={cn('flex-1 hover:bg-background', field.value === 'M' ? 'font-medium bg-background shadow' : '')}
                                                    variant={'ghost'}
                                                    onClick={() => field.onChange('M')}>
                                                    남
                                                </Button>
                                                <Button
                                                    className={cn('flex-1 hover:bg-background', field.value === 'F' ? 'font-medium bg-background shadow' : '')}
                                                    variant={'ghost'}
                                                    onClick={() => field.onChange('F')}
                                                >
                                                    여
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className='space-y-3 w-full'>
                        <Button
                            className='w-full'
                            type='submit'
                            form={SignUpFormId}>
                            회원가입
                        </Button>
                        <Link
                            to='/login'
                            search={{ redirect: '' }}
                            className='underline text-xs'
                        >
                            이미 계정이 있으신가요? 로그인하기
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>
}
