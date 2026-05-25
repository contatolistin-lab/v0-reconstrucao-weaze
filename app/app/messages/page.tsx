"use client"

import { useState } from "react"
import { ConversationList } from "@/components/messages/conversation-list"
import { ChatView } from "@/components/messages/chat-view"
import { useIsMobile } from "@/components/ui/use-mobile"

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>(undefined)
  const isMobile = useIsMobile()

  if (isMobile) {
    if (selectedConversationId) {
      return (
        <ChatView
          conversationId={selectedConversationId}
          onBack={() => setSelectedConversationId(undefined)}
        />
      )
    }
    return (
      <ConversationList
        onSelect={setSelectedConversationId as (id: string | undefined) => void}
        selectedId={selectedConversationId}
      />
    )
  }

  return (
    <div className="flex h-full">
      <div className="w-80 border-r border-border flex-shrink-0">
        <ConversationList
          onSelect={setSelectedConversationId as (id: string | undefined) => void}
          selectedId={selectedConversationId}
        />
      </div>
      <div className="flex-1">
        {selectedConversationId ? (
          <ChatView conversationId={selectedConversationId} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Selecione uma conversa para começar
          </div>
        )}
      </div>
    </div>
  )
}
