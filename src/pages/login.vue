<script lang="ts" setup>
import { useHead } from '@vueuse/head';

import { ButtonGithub } from '~/components/ButtonGithub';
import { ButtonGoogle } from '~/components/ButtonGoogle';
import { Button } from '~/styleguide/Button';
import { Card } from '~/styleguide/Card';
import { NativeInput } from '~/styleguide/NativeInput';
import EmailIcon from '~icons/heroicons-outline/at-symbol';
import LockIcon from '~icons/heroicons-outline/lock-closed';

useHead({
  title: 'Hello World',
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full p-5">
    <h1 class="mb-2 text-4xl font-black text-center">Welcome Back</h1>
    <div class="mb-5 text-sm">Don't have an account? <RouterLink to="/">Sign up now!</RouterLink></div>

    <Card class="w-full max-w-md mx-5">
      <form class="flex flex-col items-center w-full gap-y-5">
        <div class="w-full">
          <label class="block pb-1 text-sm font-medium text-gray-600">Email</label>

          <NativeInput class="w-full" type="email">
            <template #leftIcon>
              <EmailIcon class="w-4 h-4" />
            </template>
          </NativeInput>
        </div>

        <div class="w-full">
          <label class="block pb-1 text-sm font-medium text-gray-600">Password</label>
          <NativeInput class="w-full" type="password">
            <template #leftIcon>
              <LockIcon class="w-4 h-4" />
            </template>
          </NativeInput>
        </div>

        <div class="flex flex-col w-full gap-y-3">
          <Button color="primary">Sign In</Button>

          <div class="flex gap-x-3">
            <ButtonGoogle class="flex-1">Sign In with Google</ButtonGoogle>
            <ButtonGithub class="flex-1">Sign In with Github</ButtonGithub>
          </div>
        </div>
      </form>
    </Card>
  </div>
</template>
