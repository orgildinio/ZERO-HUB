import { redirect } from "next/navigation";

import { caller, getQueryClient, trpc } from "@/trpc/server";
import { Tenant } from "@/payload-types";
import { SubscriptionView } from "@/modules/subscriptions/ui/views/subscription-view";
import { AlreadySubscribed } from "@/modules/subscriptions/ui/components/already-subscribed";

const SubscriptionPage = async () => {

  const session = await caller.auth.session();
  const tenant = session.user?.tenants?.[0]?.tenant as Tenant;

  if (!session.user) redirect('/login')
  else {
    if (tenant.subscription?.subscriptionDetailsSubmitted) {
      const subscriptionId = tenant.subscription.subscriptionId

      const queryClient = getQueryClient();
      void queryClient.prefetchQuery(trpc.subscriptions.getOne.queryOptions({ subscriptionId: subscriptionId! }))
      
      return <AlreadySubscribed subscriptionId={subscriptionId!} />
    }
  }

  return (
    <SubscriptionView />
  )
}

export default SubscriptionPage