import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function HomeCta() {
    return (
        <section className="bg-background/50 dark:bg-gray-950 pb-4 md:pb-10 py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Two Column CTA Banner */}
                <Card className="bg-card border-border shadow-lg">
                    <CardContent className="p-8 lg:p-12">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left Column - Content */}
                            <div className="space-y-6">
                                {/* Headline */}
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                        Ready to Start Your Project?
                                    </h2>
                                    <p className="text-lg text-muted-foreground">
                                        Join thousands of professionals who trust our platform to connect with clients and grow their business
                                    </p>
                                </div>
                                
                                {/* Features List */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="text-muted-foreground">Quick project setup and management</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="text-muted-foreground">Secure payment processing</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="text-muted-foreground">24/7 customer support</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right Column - CTA Section */}
                            <div className="w-full">
                                <Card className="bg-muted/50 border-border w-full">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl">Get Started Today</CardTitle>
                                        <CardDescription>
                                            Create your account and start connecting with clients in minutes
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* CTA Buttons */}
                                        <div className="space-y-3">
                                            <Button className="w-full bg-green-600" size="lg">
                                                Sign Up Now
                                            </Button>
                                            <Button variant="outline" className="w-full" size="lg">
                                                <Link href={"/it-services/search/"}>Browse Services</Link>
                                            </Button>
                                        </div>
                                        
                                        {/* Trust Badge */}
                                        <div className="flex items-center justify-center gap-2 pt-2">
                                            <Badge variant="secondary" className="text-xs">
                                                No credit card required
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                Free to start
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}