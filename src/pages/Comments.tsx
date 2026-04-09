import { MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Comment {
  id: number;
  author: string;
  workshop: string;
  text: string;
  date: string;
}

const comments: Comment[] = [];

const Comments = () => {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 max-w-3xl mx-auto py-6">
        <h1 className="text-xl font-bold text-foreground mb-1 font-heading">Comments</h1>
        <p className="text-sm text-muted-foreground mb-5">
          See comments posted on your workshops by coordinators
        </p>

        {comments.length === 0 ? (
          <div className="card-elevated p-8 text-center">
            <div className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'hsl(25 6% 12%)' }}>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No comments yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Comments from coordinators on your workshops will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="card-elevated">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary">{c.workshop}</span>
                  <span className="text-[10px] text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-sm text-foreground mb-1">{c.text}</p>
                <p className="text-xs text-muted-foreground">— {c.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Comments;
