import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { computed, defineComponent, ref, VNode, withModifiers } from 'vue';
import { RouterLink } from 'vue-router';

import { Button } from '~/styleguide/Button';
import { Card } from '~/styleguide/Card';
import { NativeInput } from '~/styleguide/NativeInput';

import { ButtonGithub } from '~/components/ButtonGithub';
import { ButtonGoogle } from '~/components/ButtonGoogle';
import { useAuth } from '~/composables/firebase';
import { useLogger } from '~/composables/logging';
import { Guest } from '~/layouts/Guest';

import EmailIcon from '~icons/heroicons-outline/at-symbol';
import LockIcon from '~icons/heroicons-outline/lock-closed';

export const LoginPage = defineComponent({
  name: 'LoginPage',

  setup: () => {
    const email = ref('');
    const password = ref('');
    const error = ref('');

    const loading = ref(0);

    const auth = useAuth();
    const logger = useLogger();

    const GoogleProvider = new GoogleAuthProvider();
    const GithubProvider = new GithubAuthProvider();

    const isSignInDisabled = computed(() => {
      // Use the most primitive email regex to validate the email as
      // domains and such are always changing.
      const isValidEmail = /.+@.+\..+/.test(email.value);
      const isPassword = password.value.length > 0;

      return !isValidEmail || !isPassword || loading.value > 0;
    });

    const handleSignIn = async () => {
      try {
        error.value = '';
        loading.value += 1;

        await signInWithEmailAndPassword(auth, email.value, password.value);

        loading.value -= 1;
      } catch (err) {
        logger.error(err);

        error.value = 'There was an error signing in, please check your credentials and try again.';

        loading.value -= 1;
      }
    };

    const handleSignInWithGoogle = async () => {
      try {
        error.value = '';
        loading.value += 1;

        await signInWithPopup(auth, GoogleProvider);

        loading.value -= 1;
      } catch (err) {
        logger.error(err);

        error.value = 'There was an error signing in, please try again.';

        loading.value -= 1;
      }
    };

    const handleSignInWithGithub = async () => {
      try {
        error.value = '';
        loading.value += 1;

        await signInWithPopup(auth, GithubProvider);

        loading.value -= 1;
      } catch (err) {
        logger.error(err);

        error.value = 'There was an error signing in, please try again.';

        loading.value -= 1;
      }
    };

    return () => (
      <div class="flex w-full flex-col items-center justify-center p-5">
        <h1 class="mb-2 text-center text-4xl font-black">Welcome Back</h1>

        <div class="mb-5 text-sm">
          Don't have an account? <RouterLink to="/">Sign up now!</RouterLink>
        </div>

        <Card class="mx-5 w-full max-w-md">
          {/* I'd like an alert here */}

          <form class="flex w-full flex-col items-center gap-y-5" onSubmit={withModifiers(handleSignIn, ['prevent'])}>
            <div class="w-full">
              <label class="block pb-1 text-sm font-medium text-gray-600">Email</label>

              <NativeInput
                class="w-full"
                v-model={email.value}
                type="email"
                leftIcon={<EmailIcon class="h-4 w-4" />}
              ></NativeInput>
            </div>

            <div class="w-full">
              <label class="block pb-1 text-sm font-medium text-gray-600">Password</label>

              <NativeInput
                class="w-full"
                v-model={password.value}
                type="password"
                leftIcon={<LockIcon class="h-4 w-4" />}
              ></NativeInput>
            </div>

            <div class="flex w-full flex-col gap-y-3">
              <Button variant="primary" disabled={isSignInDisabled.value}>
                Sign In
              </Button>

              <div class="flex gap-x-3">
                <ButtonGoogle class="flex-1" onClick={handleSignInWithGoogle}>
                  Sign In with Google
                </ButtonGoogle>
                <ButtonGithub class="flex-1" onClick={handleSignInWithGithub}>
                  Sign In with Github
                </ButtonGithub>
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
  },
});

LoginPage.getLayout = (children: VNode) => <Guest>{children}</Guest>;

export default LoginPage;
