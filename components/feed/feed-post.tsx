'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShoppingBag,
  Calendar,
  ExternalLink,
  FileText,
  Phone,
  Download,
  BadgeCheck,
} from 'lucide-react'
import { type Post, type CTA, formatNumber, formatTimeAgo } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface FeedPostProps {
  post: Post
  isActive: boolean
  onLike: (postId: string) => void
  onSave: (postId: string) => void
  onShare: (postId: string) => void
  onComment: (postId: string) => void
  onCTAClick: (cta: CTA) => void
}

const ctaIcons: Record<string, React.ElementType> = {
  link: ExternalLink,
  product: ShoppingBag,
  schedule: Calendar,
  form: FileText,
  contact: Phone,
  download: Download,
}

export function FeedPost({
  post,
  isActive,
  onLike,
  onSave,
  onShare,
  onComment,
  onCTAClick,
}: FeedPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isLiked, setIsLiked] = useState(post.liked)
  const [isSaved, setIsSaved] = useState(post.saved)
  const [likeCount, setLikeCount] = useState(post.stats.likes)

  // Handle video playback based on visibility
  useEffect(() => {
    if (post.type === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          // Autoplay blocked, show play button
          setIsPlaying(false)
        })
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
      }
    }
  }, [isActive, post.type])

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike(post.id)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave(post.id)
  }

  const CTAIcon = post.cta ? ctaIcons[post.cta.type] || ExternalLink : ExternalLink

  return (
    <div className="relative h-full w-full bg-black">
      {/* Media Content */}
      <div
        className="relative h-full w-full"
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {post.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={post.content.mediaUrl}
              poster={post.content.thumbnail}
              className="h-full w-full object-cover"
              loop
              muted={isMuted}
              playsInline
            />
            {/* Play/Pause overlay */}
            <AnimatePresence>
              {(!isPlaying || showControls) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <img
            src={post.content.mediaUrl}
            alt={post.content.description}
            className="h-full w-full object-cover"
          />
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 pb-24 sm:pb-4">
        {/* Author info */}
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-11 w-11 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                {post.author.name.charAt(0)}
              </div>
            )}
            {post.author.role === 'creator' && (
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <span className="text-[10px] font-bold text-white">PRO</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white">@{post.author.username}</span>
              {post.author.verified && (
                <BadgeCheck className="h-4 w-4 fill-primary text-white" />
              )}
            </div>
            <span className="text-xs text-white/70">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
          <button className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-white/90">
          {post.content.description}
        </p>

        {/* Hashtags */}
        {post.content.hashtags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.content.hashtags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-primary">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {post.cta && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onCTAClick(post.cta!)}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90"
          >
            <CTAIcon className="h-4 w-4" />
            {post.cta.label}
          </motion.button>
        )}
      </div>

      {/* Right side actions */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 sm:bottom-20">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            whileTap={{ scale: 1.2 }}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
              isLiked ? 'bg-red-500' : 'bg-white/20'
            )}
          >
            <Heart
              className={cn(
                'h-6 w-6',
                isLiked ? 'fill-white text-white' : 'text-white'
              )}
            />
          </motion.div>
          <span className="text-xs font-medium text-white">
            {formatNumber(likeCount)}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => onComment(post.id)}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium text-white">
            {formatNumber(post.stats.comments)}
          </span>
        </button>

        {/* Share */}
        <button
          onClick={() => onShare(post.id)}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium text-white">
            {formatNumber(post.stats.shares)}
          </span>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            whileTap={{ scale: 1.2 }}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
              isSaved ? 'bg-primary' : 'bg-white/20'
            )}
          >
            <Bookmark
              className={cn(
                'h-6 w-6',
                isSaved ? 'fill-white text-white' : 'text-white'
              )}
            />
          </motion.div>
          <span className="text-xs font-medium text-white">Salvar</span>
        </button>

        {/* Mute (for videos) */}
        {post.type === 'video' && (
          <button
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
