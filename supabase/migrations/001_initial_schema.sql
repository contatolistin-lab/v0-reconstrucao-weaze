-- 001_initial_schema.sql
-- Complete Supabase PostgreSQL migration for Tramppa

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- #############################################################################
-- TABLES
-- #############################################################################

-- 1. profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text,
  username text UNIQUE,
  avatar_url text,
  phone text,
  city text,
  state text,
  country text,
  bio text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. tenants
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  bio text,
  city text,
  phone text,
  community_name text,
  community_description text,
  primary_color text DEFAULT '#8b5cf6',
  secondary_color text DEFAULT '#ec4899',
  plan text DEFAULT 'starter',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. memberships
CREATE TABLE memberships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, tenant_id)
);

-- 4. posts
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('video', 'image', 'text')),
  media_url text,
  thumbnail_url text,
  description text,
  hashtags text[],
  discussion_enabled bool NOT NULL DEFAULT false,
  interaction_prompt text,
  is_pinned bool NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. post_cta
CREATE TABLE post_cta (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('buy', 'schedule', 'quote', 'register', 'info', 'live')),
  label text,
  config_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 6. interactions
CREATE TABLE interactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  action_type text NOT NULL CHECK (action_type IN ('view', 'like', 'comment', 'click_cta', 'conversion')),
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 7. lives
CREATE TABLE lives (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text,
  description text,
  external_url text,
  is_live bool NOT NULL DEFAULT false,
  scheduled_at timestamptz,
  created_by uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 8. message_threads
CREATE TABLE message_threads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  last_message_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 9. messages
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id uuid NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  content text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- 10. topics
CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_by uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  related_post_id uuid REFERENCES posts(id) ON DELETE SET NULL,
  is_pinned bool NOT NULL DEFAULT false,
  is_locked bool NOT NULL DEFAULT false,
  last_activity_at timestamptz,
  replies_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 11. topic_messages
CREATE TABLE topic_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  content text NOT NULL,
  parent_id uuid REFERENCES topic_messages(id) ON DELETE SET NULL,
  edited_at timestamptz,
  deleted_at timestamptz,
  is_pinned bool NOT NULL DEFAULT false,
  pinned_at timestamptz,
  pinned_by uuid REFERENCES profiles(user_id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 12. groups
CREATE TABLE groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('private', 'internal')),
  image_url text,
  created_by uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 13. group_members
CREATE TABLE group_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  added_by uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- 14. group_posts
CREATE TABLE group_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  title text,
  content text,
  is_pinned bool NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 15. group_replies
CREATE TABLE group_replies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL REFERENCES group_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 16. group_system_messages
CREATE TABLE group_system_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  message_type text NOT NULL,
  user_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 17. notifications
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  type text,
  title text,
  body text,
  data jsonb,
  actor_id uuid REFERENCES profiles(user_id) ON DELETE SET NULL,
  reference_id text,
  priority text,
  content text,
  link text,
  read bool NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 18. community_requests
CREATE TABLE community_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 19. events
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 20. event_registrations
CREATE TABLE event_registrations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES post_cta(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  name text,
  email text,
  phone text,
  answers jsonb,
  status text NOT NULL DEFAULT 'pending',
  event_name text,
  event_date text,
  event_time text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 21. appointment_cta
CREATE TABLE appointment_cta (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  service_name text,
  duration_minutes int,
  service_date date,
  available_times jsonb,
  notes text,
  max_bookings int,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 22. appointment_requests
CREATE TABLE appointment_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id uuid NOT NULL REFERENCES appointment_cta(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  selected_time text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 23. budget_requests
CREATE TABLE budget_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  name text,
  email text,
  phone text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 24. user_engagement_points
CREATE TABLE user_engagement_points (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  total_points int NOT NULL DEFAULT 0,
  monthly_points int NOT NULL DEFAULT 0,
  yearly_points int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 25. engagement_logs
CREATE TABLE engagement_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  points int NOT NULL,
  reference_id text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 26. tenant_rewards
CREATE TABLE tenant_rewards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  award_type text NOT NULL DEFAULT 'badge',
  award_value text,
  min_position int,
  is_active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 27. invite_link_events
CREATE TABLE invite_link_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('visit', 'signup', 'login')),
  ref text,
  campaign text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 28. onboarding_state
CREATE TABLE onboarding_state (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  step int NOT NULL DEFAULT 0,
  completed bool NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- #############################################################################
-- INDEXES
-- #############################################################################

CREATE INDEX idx_posts_tenant_created ON posts(tenant_id, created_at DESC);
CREATE INDEX idx_post_cta_post ON post_cta(post_id);
CREATE INDEX idx_topics_tenant_activity ON topics(tenant_id, last_activity_at DESC);
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at DESC);
CREATE INDEX idx_interactions_post_action ON interactions(post_id, action_type);
CREATE UNIQUE INDEX idx_group_members_group_user ON group_members(group_id, user_id);
CREATE INDEX idx_group_posts_group_created ON group_posts(group_id, created_at DESC);
CREATE INDEX idx_messages_thread_created ON messages(thread_id, created_at ASC);
CREATE INDEX idx_community_requests_tenant_status ON community_requests(tenant_id, status);


-- #############################################################################
-- RLS POLICIES
-- #############################################################################

-- Helper function to check if user owns or is admin of a tenant
CREATE OR REPLACE FUNCTION public.is_tenant_owner_admin(p_user_id uuid, p_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM memberships
    WHERE user_id = p_user_id
      AND tenant_id = p_tenant_id
      AND is_active = true
      AND role IN ('owner', 'admin')
  );
$$;

-- Helper function to check if user is a member of a tenant
CREATE OR REPLACE FUNCTION public.is_tenant_member(p_user_id uuid, p_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM memberships
    WHERE user_id = p_user_id
      AND tenant_id = p_tenant_id
      AND is_active = true
  );
$$;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lives ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_system_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_engagement_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_link_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_state ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_select_admin" ON profiles FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), (SELECT tenant_id FROM memberships WHERE user_id = profiles.user_id LIMIT 1))
);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- tenants
CREATE POLICY "tenants_select_members" ON tenants FOR SELECT USING (
  is_tenant_member(auth.uid(), id)
);
CREATE POLICY "tenants_select_public" ON tenants FOR SELECT USING (true);
CREATE POLICY "tenants_insert_authenticated" ON tenants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "tenants_update_owner" ON tenants FOR UPDATE USING (
  is_tenant_owner_admin(auth.uid(), id)
);

-- memberships
CREATE POLICY "memberships_select_own" ON memberships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "memberships_select_admin" ON memberships FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "memberships_insert_member" ON memberships FOR INSERT WITH CHECK (
  auth.uid() = user_id AND role = 'member'
);
CREATE POLICY "memberships_insert_admin" ON memberships FOR INSERT WITH CHECK (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "memberships_update_admin" ON memberships FOR UPDATE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- posts
CREATE POLICY "posts_select_members" ON posts FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);
CREATE POLICY "posts_insert_admin" ON posts FOR INSERT WITH CHECK (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "posts_update_author_or_admin" ON posts FOR UPDATE USING (
  auth.uid() = author_id OR is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "posts_delete_author_or_admin" ON posts FOR DELETE USING (
  auth.uid() = author_id OR is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- post_cta
CREATE POLICY "post_cta_select_members" ON post_cta FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);
CREATE POLICY "post_cta_insert_admin" ON post_cta FOR INSERT WITH CHECK (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- interactions
CREATE POLICY "interactions_select_members" ON interactions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM posts WHERE posts.id = post_id
      AND is_tenant_member(auth.uid(), posts.tenant_id)
  )
);
CREATE POLICY "interactions_insert_authenticated" ON interactions FOR INSERT WITH CHECK (
  auth.uid() = user_id AND auth.role() = 'authenticated'
);

-- lives
CREATE POLICY "lives_select_members" ON lives FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);
CREATE POLICY "lives_insert_admin" ON lives FOR INSERT WITH CHECK (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "lives_update_admin" ON lives FOR UPDATE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "lives_delete_admin" ON lives FOR DELETE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- message_threads
CREATE POLICY "message_threads_select_own" ON message_threads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "message_threads_insert_own" ON message_threads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- messages
CREATE POLICY "messages_select_own" ON messages FOR SELECT USING (
  auth.uid() IN (
    SELECT user_id FROM message_threads WHERE id = thread_id
  )
);
CREATE POLICY "messages_insert_own" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND auth.uid() IN (
    SELECT user_id FROM message_threads WHERE id = thread_id
  )
);

-- topics
CREATE POLICY "topics_select_members" ON topics FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);
CREATE POLICY "topics_insert_admin" ON topics FOR INSERT WITH CHECK (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "topics_insert_authenticated" ON topics FOR INSERT WITH CHECK (
  auth.role() = 'authenticated'
);
CREATE POLICY "topics_update_admin" ON topics FOR UPDATE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- topic_messages
CREATE POLICY "topic_messages_select_members" ON topic_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM topics WHERE topics.id = topic_id
      AND is_tenant_member(auth.uid(), topics.tenant_id)
  )
);
CREATE POLICY "topic_messages_insert_authenticated" ON topic_messages FOR INSERT WITH CHECK (
  auth.uid() = user_id AND auth.role() = 'authenticated'
);
CREATE POLICY "topic_messages_update_author" ON topic_messages FOR UPDATE USING (
  auth.uid() = user_id
);
CREATE POLICY "topic_messages_delete_author_or_admin" ON topic_messages FOR DELETE USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM topics WHERE topics.id = topic_id
      AND is_tenant_owner_admin(auth.uid(), topics.tenant_id)
  )
);

-- groups
CREATE POLICY "groups_select_members" ON groups FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM group_members WHERE group_members.group_id = groups.id
      AND group_members.user_id = auth.uid()
  )
);
CREATE POLICY "groups_insert_admin" ON groups FOR INSERT WITH CHECK (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "groups_update_admin" ON groups FOR UPDATE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "groups_delete_admin" ON groups FOR DELETE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- group_members (BYPASS RLS – controlled via code due to recursion issues)
CREATE POLICY "group_members_bypass" ON group_members FOR ALL USING (true);

-- group_posts
CREATE POLICY "group_posts_select_members" ON group_posts FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM group_members WHERE group_members.group_id = group_posts.group_id
      AND group_members.user_id = auth.uid()
  )
);
CREATE POLICY "group_posts_insert_members" ON group_posts FOR INSERT WITH CHECK (
  auth.uid() = author_id
  AND EXISTS (
    SELECT 1 FROM group_members WHERE group_members.group_id = group_posts.group_id
      AND group_members.user_id = auth.uid()
  )
);
CREATE POLICY "group_posts_delete_admin" ON group_posts FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM groups WHERE groups.id = group_posts.group_id
      AND is_tenant_owner_admin(auth.uid(), groups.tenant_id)
  )
);

-- group_replies
CREATE POLICY "group_replies_select_members" ON group_replies FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM group_posts
      INNER JOIN group_members ON group_members.group_id = group_posts.group_id
      WHERE group_posts.id = group_replies.post_id
        AND group_members.user_id = auth.uid()
  )
);
CREATE POLICY "group_replies_insert_members" ON group_replies FOR INSERT WITH CHECK (
  auth.uid() = author_id
);

-- group_system_messages
CREATE POLICY "group_system_messages_select_members" ON group_system_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM group_members WHERE group_members.group_id = group_system_messages.group_id
      AND group_members.user_id = auth.uid()
  )
);

-- notifications
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete_own" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- community_requests
CREATE POLICY "community_requests_select_admin" ON community_requests FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "community_requests_select_own" ON community_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "community_requests_insert_authenticated" ON community_requests FOR INSERT WITH CHECK (
  auth.uid() = user_id AND auth.role() = 'authenticated'
);
CREATE POLICY "community_requests_update_admin" ON community_requests FOR UPDATE USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- events
CREATE POLICY "events_select_members" ON events FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);

-- event_registrations
CREATE POLICY "event_registrations_select_own" ON event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "event_registrations_select_admin" ON event_registrations FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "event_registrations_insert_authenticated" ON event_registrations FOR INSERT WITH CHECK (
  auth.uid() = user_id AND auth.role() = 'authenticated'
);

-- appointment_cta
CREATE POLICY "appointment_cta_select_members" ON appointment_cta FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);

-- appointment_requests
CREATE POLICY "appointment_requests_select_own" ON appointment_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "appointment_requests_select_admin" ON appointment_requests FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "appointment_requests_insert_authenticated" ON appointment_requests FOR INSERT WITH CHECK (
  auth.uid() = user_id AND auth.role() = 'authenticated'
);

-- budget_requests
CREATE POLICY "budget_requests_select_own" ON budget_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "budget_requests_select_admin" ON budget_requests FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);
CREATE POLICY "budget_requests_insert_authenticated" ON budget_requests FOR INSERT WITH CHECK (
  auth.uid() = user_id AND auth.role() = 'authenticated'
);

-- user_engagement_points
CREATE POLICY "user_engagement_points_select_own" ON user_engagement_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_engagement_points_select_admin" ON user_engagement_points FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- engagement_logs
CREATE POLICY "engagement_logs_select_own" ON engagement_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "engagement_logs_select_admin" ON engagement_logs FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- tenant_rewards
CREATE POLICY "tenant_rewards_select_members" ON tenant_rewards FOR SELECT USING (
  is_tenant_member(auth.uid(), tenant_id)
);

-- invite_link_events
CREATE POLICY "invite_link_events_select_admin" ON invite_link_events FOR SELECT USING (
  is_tenant_owner_admin(auth.uid(), tenant_id)
);

-- onboarding_state
CREATE POLICY "onboarding_state_select_own" ON onboarding_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "onboarding_state_insert_own" ON onboarding_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "onboarding_state_update_own" ON onboarding_state FOR UPDATE USING (auth.uid() = user_id);


-- #############################################################################
-- VIEWS
-- #############################################################################

CREATE OR REPLACE VIEW tenant_stats AS
SELECT
  m.tenant_id,
  COUNT(DISTINCT m.user_id) AS total_members,
  COUNT(DISTINCT p.id) AS total_posts,
  COUNT(DISTINCT i.id) AS total_interactions
FROM memberships m
LEFT JOIN posts p ON p.tenant_id = m.tenant_id
LEFT JOIN interactions i ON i.post_id = p.id
GROUP BY m.tenant_id;


-- #############################################################################
-- RPC FUNCTIONS
-- #############################################################################

-- 1. award_engagement_points
CREATE OR REPLACE FUNCTION award_engagement_points(
  p_user_id uuid,
  p_tenant_id uuid,
  p_action_type text,
  p_points int,
  p_reference_id text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_month int;
  v_current_year int;
BEGIN
  v_current_month := EXTRACT(MONTH FROM now())::int;
  v_current_year := EXTRACT(YEAR FROM now())::int;

  INSERT INTO engagement_logs (user_id, tenant_id, action_type, points, reference_id)
  VALUES (p_user_id, p_tenant_id, p_action_type, p_points, p_reference_id);

  INSERT INTO user_engagement_points (user_id, tenant_id, total_points, monthly_points, yearly_points)
  VALUES (p_user_id, p_tenant_id, p_points, p_points, p_points)
  ON CONFLICT (user_id, tenant_id) DO UPDATE SET
    total_points = user_engagement_points.total_points + p_points,
    monthly_points = CASE
      WHEN EXTRACT(MONTH FROM now()) = v_current_month THEN user_engagement_points.monthly_points + p_points
      ELSE p_points
    END,
    yearly_points = CASE
      WHEN EXTRACT(YEAR FROM now()) = v_current_year THEN user_engagement_points.yearly_points + p_points
      ELSE p_points
    END,
    updated_at = now();
END;
$$;

-- 2. get_monthly_ranking
CREATE OR REPLACE FUNCTION get_monthly_ranking(p_tenant_id uuid)
RETURNS TABLE(
  user_id uuid,
  total_points bigint,
  rank bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    uep.user_id,
    uep.monthly_points::bigint AS total_points,
    ROW_NUMBER() OVER (ORDER BY uep.monthly_points DESC) AS rank
  FROM user_engagement_points uep
  WHERE uep.tenant_id = p_tenant_id
  ORDER BY uep.monthly_points DESC;
$$;

-- 3. get_yearly_ranking
CREATE OR REPLACE FUNCTION get_yearly_ranking(p_tenant_id uuid)
RETURNS TABLE(
  user_id uuid,
  total_points bigint,
  rank bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    uep.user_id,
    uep.yearly_points::bigint AS total_points,
    ROW_NUMBER() OVER (ORDER BY uep.yearly_points DESC) AS rank
  FROM user_engagement_points uep
  WHERE uep.tenant_id = p_tenant_id
  ORDER BY uep.yearly_points DESC;
$$;

-- 4. is_tenant_owner
CREATE OR REPLACE FUNCTION is_tenant_owner(p_user_id uuid, p_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM memberships
    WHERE user_id = p_user_id
      AND tenant_id = p_tenant_id
      AND is_active = true
      AND role = 'owner'
  );
$$;

-- 5. is_tenant_member
CREATE OR REPLACE FUNCTION is_tenant_member(p_user_id uuid, p_tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM memberships
    WHERE user_id = p_user_id
      AND tenant_id = p_tenant_id
      AND is_active = true
  );
$$;

-- 6. request_community_join
CREATE OR REPLACE FUNCTION request_community_join(p_tenant_id uuid, p_user_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO community_requests (tenant_id, user_id, status)
  VALUES (p_tenant_id, p_user_id, 'pending')
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- 7. approve_community_member
CREATE OR REPLACE FUNCTION approve_community_member(p_request_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_tenant_id uuid;
  v_user_id uuid;
BEGIN
  SELECT tenant_id, user_id INTO v_tenant_id, v_user_id
  FROM community_requests
  WHERE id = p_request_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Request not found or already processed';
  END IF;

  UPDATE community_requests SET status = 'approved'
  WHERE id = p_request_id;

  INSERT INTO memberships (user_id, tenant_id, role)
  VALUES (v_user_id, v_tenant_id, 'member')
  ON CONFLICT (user_id, tenant_id) DO UPDATE SET
    is_active = true,
    role = 'member';
END;
$$;

-- 8. reject_community_member
CREATE OR REPLACE FUNCTION reject_community_member(p_request_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE community_requests
  SET status = 'rejected'
  WHERE id = p_request_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Request not found or already processed';
  END IF;
END;
$$;
