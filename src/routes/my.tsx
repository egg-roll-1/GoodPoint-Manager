import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogout } from '@/features/auth/hooks/useAuth'
import { useUser, useUserPatch } from '@/features/user/hooks/useUser'
import { PatchUserProfileForm, type PatchUserProfileRequest } from '@/features/user/model/user.request'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { PencilIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/my')({
    component: My,
})


export const UserPatchFormId = 'user-patch-form'

function My() {
    const { logout } = useLogout()
    const { data: user } = useUser();
    const { mutate: patchUser, isPending: isPatching } = useUserPatch();

    const [isEditMode, setIsEditMode] = useState(false);


    const form = useForm<PatchUserProfileRequest>({
        resolver: zodResolver(PatchUserProfileForm),
        disabled: !isEditMode,
        defaultValues: {
            username: '',
            phoneNumber: ''
        }
    })

    const fillWithData = useCallback(() => {
        if (!user) return;

        form.setValue('username', user.name)
        form.setValue('phoneNumber', user.phoneNumber);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const onSubmit = useCallback((values: PatchUserProfileRequest) => {
        patchUser(values, {
            onSuccess: () => {
                setIsEditMode(false)
            }
        })
    }, [patchUser])

    const onCancel = useCallback(() => {
        setIsEditMode(false);
        fillWithData();
    }, [fillWithData])

    useEffect(() => {
        fillWithData()
    }, [fillWithData])

    return (
        <Layout className=''
            right={
                <div>
                    {isEditMode
                        ? <div className='space-x-2'>
                            <Button
                                variant={'destructive'}
                                onClick={onCancel}>
                                {`취소`}
                            </Button>
                            <Button type='submit' form={UserPatchFormId}>
                                {`저장${isPatching ? '중...' : ''}`}
                            </Button>
                        </div>
                        : <div>
                            <Button
                                variant={'outline'}
                                onClick={() => setIsEditMode(true)}>
                                <PencilIcon />
                                {`수정`}
                            </Button>
                        </div>
                    }
                </div>
            }>
            <div className='flex flex-col space-y-5'>
                <Form {...form}>
                    <form
                        id={UserPatchFormId}
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name='username'
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
                            name='phoneNumber'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>전화번호</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </form>
                </Form>

                <Button
                    variant={'ghost'}
                    onClick={logout}
                    className='underline w-fit'
                >
                    로그아웃
                </Button>
            </div>
        </Layout>
    )
}