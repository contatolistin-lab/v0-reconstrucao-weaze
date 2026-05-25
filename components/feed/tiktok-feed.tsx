'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FeedPost } from './feed-post'
import { mockPosts, type Post, type CTA } from '@/lib/mock-data'

export function TikTokFeed() {
  const [posts] = useState<Post[]>(mockPosts)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // Handle scroll snap detection
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollTop = container.scrollTop
    const itemHeight = container.clientHeight
    const newIndex = Math.round(scrollTop / itemHeight)

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < posts.length) {
      setActiveIndex(newIndex)
    }
  }, [activeIndex, posts.length])

  // Debounced scroll handler
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: NodeJS.Timeout

    const onScroll = () => {
      setIsScrolling(true)
      handleScroll()

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimeout)
    }
  }, [handleScroll])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return

      const container = containerRef.current
      const itemHeight = container.clientHeight

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault()
        const nextIndex = Math.min(activeIndex + 1, posts.length - 1)
        container.scrollTo({
          top: nextIndex * itemHeight,
          behavior: 'smooth',
        })
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault()
        const prevIndex = Math.max(activeIndex - 1, 0)
        container.scrollTo({
          top: prevIndex * itemHeight,
          behavior: 'smooth',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, posts.length])

  // Action handlers
  const handleLike = (postId: string) => {
    console.log('[v0] Like post:', postId)
  }

  const handleSave = (postId: string) => {
    console.log('[v0] Save post:', postId)
  }

  const handleShare = (postId: string) => {
    console.log('[v0] Share post:', postId)
    // In a real app, open share modal
  }

  const handleComment = (postId: string) => {
    console.log('[v0] Comment on post:', postId)
    // In a real app, open comments sheet
  }

  const handleCTAClick = (cta: CTA) => {
    console.log('[v0] CTA clicked:', cta)
    // In a real app, navigate or open modal based on CTA type
    if (cta.url) {
      window.open(cta.url, '_blank')
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-none"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          className="h-full w-full snap-start snap-always"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <FeedPost
            post={post}
            isActive={activeIndex === index && !isScrolling}
            onLike={handleLike}
            onSave={handleSave}
            onShare={handleShare}
            onComment={handleComment}
            onCTAClick={handleCTAClick}
          />
        </motion.div>
      ))}

      {/* Progress indicator */}
      <div className="fixed right-1 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1.5">
        {posts.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1 rounded-full transition-all ${
              index === activeIndex
                ? 'h-4 bg-white'
                : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
