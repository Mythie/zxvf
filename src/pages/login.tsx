import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

import { ButtonGithub } from '~/components/ButtonGithub';
import { ButtonGoogle } from '~/components/ButtonGoogle';
import { Button } from '~/styleguide/Button';
import { Card } from '~/styleguide/Card';
import { NativeInput } from '~/styleguide/NativeInput';
import EmailIcon from '~icons/heroicons-outline/at-symbol';
import LockIcon from '~icons/heroicons-outline/lock-closed';

export const LoginPage = defineComponent({
  name: 'LoginPage',

  setup: () => {
    return () => (
      <div class="flex w-full flex-col items-center justify-center p-5">
        <h1 class="mb-2 text-center text-4xl font-black">Welcome Back</h1>
        <div class="mb-5 text-sm">
          Don't have an account? <RouterLink to="/">Sign up now!</RouterLink>
        </div>

        <Card class="mx-5 w-full max-w-md">
          <form class="flex w-full flex-col items-center gap-y-5">
            <div class="w-full">
              <label class="block pb-1 text-sm font-medium text-gray-600">Email</label>

              <NativeInput class="w-full" type="email" leftIcon={<EmailIcon class="h-4 w-4" />}></NativeInput>
            </div>

            <div class="w-full">
              <label class="block pb-1 text-sm font-medium text-gray-600">Password</label>

              <NativeInput class="w-full" type="password" leftIcon={<LockIcon class="h-4 w-4" />}></NativeInput>
            </div>

            <div class="flex w-full flex-col gap-y-3">
              <Button variant="primary">Sign In</Button>

              <div class="flex gap-x-3">
                <ButtonGoogle class="flex-1">Sign In with Google</ButtonGoogle>
                <ButtonGithub class="flex-1">Sign In with Github</ButtonGithub>
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
  },
});

// LoginPage.getLayout = (children: VNode) => <Default>{children}</Default>;

export default LoginPage;
